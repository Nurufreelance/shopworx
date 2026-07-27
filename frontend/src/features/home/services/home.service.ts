import { machines, machineErrors } from "../constants/home.constants";

export const homeService = {

    getMachines(){

        return Promise.resolve(machines);

    },

    getMachineErrors(){

        return Promise.resolve(machineErrors);

    }

}