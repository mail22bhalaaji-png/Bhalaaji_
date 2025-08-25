import React from 'react';
import { resumeData } from './data';
import { type ResumeData, type Experience, type Education, type Skill, type SoftwareSkill, type Language, type Certification } from './types';
import { PhoneIcon, MailIcon, LinkedinIcon, LocationMarkerIcon, LinkIcon, CalendarIcon, BriefcaseIcon, AcademicCapIcon, StarIcon, CheckCircleIcon, DocumentDownloadIcon } from './components/Icons';

const App: React.FC = () => {
  const data: ResumeData = resumeData;

  return (
    <div className="min-h-screen bg-slate-200 font-sans text-slate-800">
      <div className="container mx-auto p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden">

          {/* Sidebar */}
          <aside className="lg:w-1/3 bg-slate-800 text-slate-200 p-8 flex flex-col">
            <div className="text-center lg:text-left">
                <h1 className="text-4xl font-extrabold text-white tracking-tight">{data.name}</h1>
                <h2 className="text-xl font-light text-cyan-400 mt-2">{data.title}</h2>
            </div>
            
            <div className="mt-8 text-center lg:text-left">
                <button 
                    onClick={() => window.print()}
                    className="w-full lg:w-auto bg-slate-700 hover:bg-slate-600 text-cyan-400 font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 print:hidden"
                    aria-label="Download Resume as PDF"
                >
                    <DocumentDownloadIcon className="w-5 h-5" />
                    <span>Download Resume</span>
                </button>
            </div>
            
            <div className="mt-10 space-y-8">
              <SidebarSection title="Contact">
                <div className="space-y-3">
                  <ContactItem icon={<PhoneIcon />} text={data.contact.phones.join(' / ')} />
                  <ContactItem icon={<MailIcon />} text={data.contact.emails.join(' / ')} />
                  <ContactItem icon={<LinkedinIcon />} text={data.contact.linkedin} href={`https://${data.contact.linkedin}`} />
                  <ContactItem icon={<LocationMarkerIcon />} text={data.contact.address} />
                </div>
              </SidebarSection>
              
              <SidebarSection title="Technical Skills">
                 <div className="space-y-4">
                  {data.technicalSkills.map((skill, index) => (
                    <SkillItem key={index} skill={skill} />
                  ))}
                </div>
              </SidebarSection>
              
              <SidebarSection title="Software Skills">
                 <div className="flex flex-wrap gap-2">
                  {data.softwareSkills.map((skill, index) => (
                    <SoftwareSkillItem key={index} skill={skill} />
                  ))}
                </div>
              </SidebarSection>

              <SidebarSection title="Languages">
                <div className="space-y-4">
                  {data.languages.map((lang, index) => (
                    <LanguageItem key={index} language={lang} />
                  ))}
                </div>
              </SidebarSection>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-2/3 p-8 space-y-12">
              <MainSection title="Summary">
                <p className="text-slate-600 leading-relaxed">{data.summary}</p>
              </MainSection>

              <MainSection title="Experience">
                <div>
                  {data.experience.map((exp, index) => (
                    <ExperienceItem key={index} experience={exp} isLast={index === data.experience.length - 1} />
                  ))}
                </div>
              </MainSection>
              
              <MainSection title="Education">
                <div>
                  {data.education.map((edu, index) => (
                    <EducationItem key={index} education={edu} isLast={index === data.education.length - 1} />
                  ))}
                </div>
              </MainSection>
              
              <MainSection title="Courses and Certification">
                <div className="space-y-4">
                  {data.certifications.map((cert, index) => (
                    <CertificationItem key={index} certification={cert} />
                  ))}
                </div>
              </MainSection>
          </main>
        </div>
      </div>
    </div>
  );
};

// Section Components
interface SectionProps {
  title: string;
  children: React.ReactNode;
}
const SidebarSection: React.FC<SectionProps> = ({ title, children }) => (
  <section>
    <h3 className="text-lg font-semibold text-cyan-400 uppercase tracking-wider mb-4">{title}</h3>
    {children}
  </section>
);

const MainSection: React.FC<SectionProps> = ({ title, children }) => (
  <section>
    <h3 className="text-2xl font-extrabold text-slate-700 border-b-4 border-cyan-300 pb-2 mb-6">{title}</h3>
    {children}
  </section>
);


// Sidebar Components
interface ContactItemProps {
  icon: React.ReactNode;
  text: string;
  href?: string;
}
const ContactItem: React.FC<ContactItemProps> = ({ icon, text, href }) => (
  <div className="flex items-start text-slate-300">
    <span className="text-cyan-400 w-5 h-5 mr-4 mt-1 flex-shrink-0">{icon}</span>
    {href ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 hover:underline break-all">{text}</a>
    ) : (
      <span className="break-all">{text}</span>
    )}
  </div>
);

const SkillItem: React.FC<{ skill: Skill }> = ({ skill }) => (
    <div>
        <p className="font-bold text-md text-slate-100">{skill.name}</p>
        <p className="text-sm text-slate-400">{skill.description}</p>
    </div>
);

const SoftwareSkillItem: React.FC<{ skill: SoftwareSkill }> = ({ skill }) => (
    <span className="bg-slate-700 text-slate-200 text-sm font-medium px-3 py-1 rounded-full">
        {skill.name}
    </span>
);

const LanguageItem: React.FC<{ language: Language }> = ({ language }) => (
    <div>
        <div className="flex justify-between items-baseline mb-1">
            <span className="font-bold text-md text-slate-100">{language.name}</span>
            <span className="text-sm text-slate-400">{language.level}</span>
        </div>
        <div className="flex items-center bg-slate-700 rounded-full h-2">
           <div className="bg-cyan-400 h-2 rounded-full" style={{width: `${language.rating * 20}%`}}></div>
        </div>
    </div>
);

// Main Content Components
const ExperienceItem: React.FC<{ experience: Experience; isLast: boolean }> = ({ experience, isLast }) => (
  <div className="flex">
    <div className="flex flex-col items-center mr-4">
      <div>
        <div className="flex items-center justify-center w-10 h-10 bg-cyan-100 rounded-full">
          <BriefcaseIcon className="text-cyan-600 w-6 h-6"/>
        </div>
      </div>
      {!isLast && <div className="w-px h-full bg-slate-200"></div>}
    </div>
    <div className={!isLast ? 'pb-8' : ''}>
      <p className="mb-1 text-xl font-bold text-slate-800">{experience.role}</p>
      <p className="text-md font-semibold text-cyan-700">{experience.company}</p>
      <div className="text-sm text-slate-500 mt-1 flex flex-wrap gap-x-4 gap-y-1">
          <div className="flex items-center"><CalendarIcon className="mr-1.5"/><span>{experience.duration}</span></div>
          <div className="flex items-center"><LocationMarkerIcon className="mr-1.5 h-4 w-4"/><span>{experience.location}</span></div>
          {experience.url && <div className="flex items-center"><LinkIcon className="mr-1.5"/><a href={experience.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{experience.url}</a></div>}
      </div>
      <ul className="mt-3 list-disc list-inside space-y-1.5 text-slate-600 marker:text-cyan-400">
        {experience.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
      </ul>
    </div>
  </div>
);

const EducationItem: React.FC<{ education: Education; isLast: boolean }> = ({ education, isLast }) => (
  <div className="flex">
    <div className="flex flex-col items-center mr-4">
      <div>
        <div className="flex items-center justify-center w-10 h-10 bg-cyan-100 rounded-full">
            <AcademicCapIcon className="text-cyan-600 w-6 h-6"/>
        </div>
      </div>
       {!isLast && <div className="w-px h-full bg-slate-200"></div>}
    </div>
    <div className={!isLast ? 'pb-8' : ''}>
        <p className="text-xl font-bold text-slate-800">{education.degree}</p>
        <p className="text-md font-semibold text-cyan-700 mt-1">{education.institution}</p>
        <div className="text-sm text-slate-500 mt-2 flex flex-wrap gap-x-4 gap-y-1">
            <div className="flex items-center"><CalendarIcon className="mr-1.5"/><span>{education.duration}</span></div>
            <div className="flex items-center"><LocationMarkerIcon className="mr-1.5 h-4 w-4"/><span>{education.location}</span></div>
        </div>
    </div>
  </div>
);

const CertificationItem: React.FC<{ certification: Certification }> = ({ certification }) => (
    <div className="flex items-start">
        <CheckCircleIcon className="text-cyan-500 mr-3 mt-1 flex-shrink-0 w-5 h-5" />
        <div>
            <p className="font-bold text-md text-slate-800">{certification.name}</p>
            <p className="text-sm text-slate-600">{certification.issuer}</p>
        </div>
    </div>
);

export default App;