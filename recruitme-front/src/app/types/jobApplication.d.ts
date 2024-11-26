type jobApplication = {
  id: number,
  name: string,
  email: string,
  motivation: string,
  resumeFile: {
    id: number
  },
  createdAt: Date,
  status: "accepted" | "rejected" | "pending",
  jobOffer: JobOffer,
}