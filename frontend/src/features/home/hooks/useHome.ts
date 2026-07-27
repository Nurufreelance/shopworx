import { useEffect, useState } from "react";
import { homeService } from "../services/home.service";
import { Machine, MachineError } from "../types/home.types";

export function useHome(){

const [machines,setMachines]=useState<Machine[]>([]);
const [errors,setErrors]=useState<MachineError[]>([]);

useEffect(()=>{

homeService.getMachines().then(setMachines);

homeService.getMachineErrors().then(setErrors);

},[]);

return{

machines,
errors,

}

}