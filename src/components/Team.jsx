import lucas from '../assets/images/simulacao/team/lucas.png'
import alan from '../assets/images/simulacao/team/alan.png'
import arthur from '../assets/images/simulacao/team/arthur.png'
import vitor from '../assets/images/simulacao/team/vitor.png'
import paulo from '../assets/images/simulacao/team/paulo.png'
import { useT } from '../i18n/LanguageContext'
import { Section, SectionHeader } from './ui'

const people = [
  { name: 'Lucas Albertoni', photo: lucas },
  { name: 'Alan Rogana', photo: alan },
  { name: 'Arthur Bernardes', photo: arthur },
  { name: 'Vitor Tostes', photo: vitor },
  { name: 'Paulo Henrique Lima', photo: paulo },
]

export default function Team() {
  const t = useT()
  const members = t('team.members')
  return (
    <Section alt waves={0.16}>
      <SectionHeader eyebrow={t('team.label')} title={t('team.title')} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-12">
        {people.map((person, i) => (
          <div
            key={person.name}
            className={`team-card flex flex-col items-center text-center reveal d${(i % 4) + 1} ${i === people.length - 1 ? 'max-md:col-span-2' : ''}`}
          >
            <img src={person.photo} alt={person.name} loading="lazy" className="team-photo" />
            <div className="font-display font-semibold text-exyo-white text-base sm:text-lg tracking-tight mt-3">{person.name}</div>
            <div className="text-exyo-cyan text-xs sm:text-sm mt-1">{members[i].role}</div>
            <p className="text-exyo-gray text-sm font-light leading-relaxed mt-3 max-w-[210px]">{members[i].line}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
