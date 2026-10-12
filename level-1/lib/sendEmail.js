export const sendEmail = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Email sent successfully")
        }, 5000)
    })
}