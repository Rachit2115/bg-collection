"use server"

const WEB3FORMS_ACCESS_KEY = "d438427d-894e-41ec-8ae2-18caa7a54c06"
const RECIPIENT_EMAIL = "rachit2115cool@gmail.com"

export async function submitContactForm(formData: FormData) {
  try {
    const contactData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      timestamp: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    // Create contact message
    const contactMessage = `
📧 NEW CONTACT FORM SUBMISSION - BG Collection

👤 CONTACT DETAILS:
Name: ${contactData.name}
Email: ${contactData.email}
Phone: ${contactData.phone}
Subject: ${contactData.subject}

📝 MESSAGE:
${contactData.message}

🕒 SUBMITTED ON:
${contactData.timestamp}

---
This message was submitted through the BG Collection contact form.
    `.trim()

    // Send via Web3Forms
    const web3FormsData = new FormData()
    web3FormsData.append("access_key", WEB3FORMS_ACCESS_KEY)
    web3FormsData.append("subject", `Contact Form: ${contactData.subject} - BG Collection`)
    web3FormsData.append("from_name", contactData.name)
    web3FormsData.append("email", contactData.email)
    web3FormsData.append("message", contactMessage)
    web3FormsData.append("to", RECIPIENT_EMAIL)

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: web3FormsData,
    })

    const result = await response.json()

    if (result.success) {
      console.log("Contact form submitted successfully via Web3Forms")
      return {
        success: true,
        message: "Thank you for contacting us! We'll get back to you shortly.",
      }
    } else {
      console.error("Failed to submit contact form:", result)
      return {
        success: false,
        message: "Failed to send your message. Please try again.",
      }
    }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    }
  }
}
