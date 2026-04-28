export class MockBullQueue {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  
  async add(jobName: string, data: any) {
    console.log(`[Queue ${this.name}] Added job ${jobName}:`, data);
    
    // Simulate background processing asynchronously
    setTimeout(async () => {
      console.log(`[Queue ${this.name}] Processing job ${jobName}...`);
      await this.processJob(jobName, data);
    }, 1000);
    
    return { id: `job_${Math.random().toString(36).substring(7)}` };
  }

  private async processJob(jobName: string, data: any) {
    // Basic simulation logic
    console.log(`Job ${jobName} data processed.`);
  }
}

export const crawlQueue = new MockBullQueue('crawl-queue');
export const extractionQueue = new MockBullQueue('extraction-queue');
