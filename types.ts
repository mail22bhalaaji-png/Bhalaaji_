export interface ContactInfo {
  phones: string[];
  emails: string[];
  linkedin: string;
  address: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  location: string;
  url?: string;
  responsibilities: string[];
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  location: string;
}

export interface Skill {
  name: string;
  description: string;
}

export interface SoftwareSkill {
  name: string;
}

export interface Language {
  name: string;
  level: string;
  rating: number; // e.g., 3 out of 5
}

export interface Certification {
    name: string;
    issuer: string;
}

export interface ResumeData {
  name: string;
  title: string;
  summary: string;
  contact: ContactInfo;
  experience: Experience[];
  education: Education[];
  technicalSkills: Skill[];
  softwareSkills: SoftwareSkill[];
  certifications: Certification[];
  languages: Language[];
}
