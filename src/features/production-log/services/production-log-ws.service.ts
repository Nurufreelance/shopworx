type MessageHandler = (data: any) => void;

export class ProductionLogWebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;
  private handlers: Map<string, MessageHandler> = new Map();
  private isConnecting = false;

  connect() {
    if (this.isConnecting || this.ws?.readyState === WebSocket.OPEN) return;

    this.isConnecting = true;
    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8000';
    
    try {
      this.ws = new WebSocket(`${wsUrl}/production-logs`);

      this.ws.onopen = () => {
        console.log('🔌 Production Log WebSocket connected');
        this.reconnectAttempts = 0;
        this.isConnecting = false;
        this.emit('connected', { status: 'connected' });
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.emit('message', data);
          
          // Handle specific message types
          if (data.type === 'new-log') {
            this.emit('new-log', data.payload);
          } else if (data.type === 'log-update') {
            this.emit('log-update', data.payload);
          } else if (data.type === 'stats-update') {
            this.emit('stats-update', data.payload);
          }
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('🔌 Production Log WebSocket disconnected');
        this.isConnecting = false;
        this.emit('disconnected', { status: 'disconnected' });
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.emit('error', error);
      };
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
      this.isConnecting = false;
      this.attemptReconnect();
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('Max reconnect attempts reached');
      return;
    }

    this.reconnectAttempts++;
    console.log(`Attempting reconnect ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);
    
    setTimeout(() => {
      this.connect();
    }, this.reconnectDelay * this.reconnectAttempts);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.handlers.clear();
  }

  send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn('WebSocket not connected, message not sent');
    }
  }

  on(event: string, handler: MessageHandler) {
    this.handlers.set(event, handler);
  }

  off(event: string) {
    this.handlers.delete(event);
  }

  private emit(event: string, data: any) {
    const handler = this.handlers.get(event);
    if (handler) {
      handler(data);
    }
  }

  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

export const productionLogWs = new ProductionLogWebSocketService();