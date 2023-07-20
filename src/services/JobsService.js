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

  setJobToEdit(job) {
    AppState.selectedJob = job
  }

  async editJob(jobData) {
    const res = await api.put(`api/jobs/${jobData.id}`, jobData)

    logger.log(res)

    const updatedJob = new Job(res.data)

    const jobIndex = AppState.jobs.findIndex(j => j.id == jobData.id)

    AppState.jobs.splice(jobIndex, 1, updatedJob)
  }

  async removeJob(jobId) {
    const res = await api.delete(`api/jobs/${jobId}`)

    logger.log(res.data)

    const jobIndex = AppState.jobs.findIndex(j => j.id == jobId)

    AppState.jobs.splice(jobIndex, 1)
  }
}

export const jobsService = new JobsService