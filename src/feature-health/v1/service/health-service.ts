import { HealthResponse } from "../model/health-response";
import os from 'os';
import si from 'systeminformation';


export class HealthService {
    constructor() {
        
    }

    async Health(): Promise<HealthResponse> {
        try {
            const totalMemory = Math.round(os.totalmem() / 1024 / 1024)
            const freeMemory = Math.round(os.freemem() / 1024 / 1024)
            const usedMemoryPercent = ((1 - os.freemem() / os.totalmem()) * 100).toFixed(2)

            const cpuPercentages = await si.currentLoad()
            const cpus: string[] = cpuPercentages.cpus.map(
                (cpu, index) => `CPU[${index}]: ${cpu.load.toFixed(2)}%`
            )

            const hostInfo = await si.osInfo()
            const hostId = await si.uuid()
            
            const res: HealthResponse = {
                name: 'product',
                uptime: `${Math.floor((process.uptime() * 1000) / 1000)}s`,
                totalMemory: `${totalMemory} MB`,
                freeMemory: `${freeMemory} MB`,
                usedPercent: `${usedMemoryPercent}%`,
                cpus: cpus,
                hostOS: hostInfo.platform,
                hostId: hostId.os
            }
            return res
        } catch (error) {
            throw error
        }
    }
}