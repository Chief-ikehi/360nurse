import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // In a real implementation, you would:
    // 1. Send an email notification
    // 2. Store the contact request in the database
    // 3. Maybe trigger a notification to admin users
    
    // For now, we'll just simulate a successful submission
    
    // Example of how you might send an email using a service like Nodemailer or SendGrid
    // await sendEmail({
    //   to: 'support@360nurse.com',
    //   subject: `New Contact Form Submission: ${subject}`,
    //   text: `
    //     Name: ${name}
    //     Email: ${email}
    //     Phone: ${phone || 'Not provided'}
    //     Subject: ${subject}
    //     Message: ${message}
    //   `
    // });
    
    // Example of how you might store in the database
    // await prisma.contactRequest.create({
    //   data: {
    //     name,
    //     email,
    //     phone,
    //     subject,
    //     message,
    //     status: 'NEW'
    //   }
    // });
    
    return NextResponse.json(
      { success: true, message: 'Contact request received successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact request:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
