import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { crawlQueue } from '@/lib/queue';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { strategy, seedUrls, projectId, name } = body;
    
    // Default to a dummy project if missing for testing
    let pid = projectId;
    if (!pid) {
      const org = await prisma.organization.findFirst() || await prisma.organization.create({
        data: { name: 'Default Org' }
      });
      const proj = await prisma.project.findFirst() || await prisma.project.create({
        data: { name: 'Default Project', organizationId: org.id }
      });
      pid = proj.id;
    }

    const job = await prisma.crawlJob.create({
      data: {
        name: name || `Crawl ${Date.now()}`,
        projectId: pid,
        strategy: strategy || 'BFS',
        seedUrls: JSON.stringify(seedUrls || []),
        status: 'QUEUED'
      }
    });
    
    await crawlQueue.add('process-crawl', { jobId: job.id, strategy, seedUrls });
    
    return NextResponse.json({ 
      success: true, 
      message: "Crawl Job queued successfully",
      data: job
    }, { status: 202 });

  } catch (error) {
    console.error('Crawl Error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

