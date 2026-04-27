import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { strategy, seedUrls, prompt } = body;
    
    // Minimal mock for architecture showcase
    // In a real app this would drop a job into BullMQ/Redis
    
    return NextResponse.json({ 
      success: true, 
      message: "Crawl Job queued successfully",
      jobId: `job_${Math.random().toString(36).substring(7)}`,
      strategy
    }, { status: 202 });

  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
