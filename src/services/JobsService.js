import { AppState } from "../AppState.js"
import { Job } from "../models/Jobs.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class JobsService {
  async getJobs() {
    const res = await api.get('/api/jobs')

    logger.log("Got Jobs", res.data)

    const jobs = res.data.map(pojo => new Job(pojo))

    AppState.jobs = jobs
  }

  async createJob(jobData) {
    const res = await api.post('/api/jobs', jobData)

    logger.log("Created Job?", res.data)

    const job = new Job(res.data)

    AppState.jobs.push(job)
  }
}

export const jobsService = new JobsService