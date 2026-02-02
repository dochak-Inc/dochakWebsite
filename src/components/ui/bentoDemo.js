import React, { useContext } from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento";
import {
  IconBuilding,
  IconSettingsAutomation,
  IconApps,
  IconBriefcase
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import traffic from '../../assets/simulFake.webp'; //
import truck from '../../assets/truck_hori.webp';
import multi from '../../assets/multi.webp';
import working from '../../assets/working.webp';
import LanguageContext from '../../contexts/LanguageContext';

export function BentoDemo() {
  const navigate = useNavigate();
  const { t } = useContext(LanguageContext);

  const items = [
    {
      title: t('bento.about.title'),
      description: t('bento.about.description'),
      header: <Skeleton img={truck}/>,
      icon: <IconBuilding className="h-5 w-5 text-neutral-500" />,
      link: "/about",
    },
    {
      title: t('bento.technologies.title'),
      description: t('bento.technologies.description'),
      header: <Skeleton img={traffic}/>,
      icon: <IconSettingsAutomation className="h-5 w-5 text-neutral-500" />,
      link: "/disclosure",
    },
    {
      title: t('bento.solutions.title'),
      description: t('bento.solutions.description'),
      header: <Skeleton img={multi}/>,
      icon: <IconApps className="h-5 w-5 text-neutral-500" />,
      link: "/solutions",
    },
    {
      title: t('bento.projects.title'),
      description: t('bento.projects.description'),
      header: <Skeleton img={working}/>,
      icon: <IconBriefcase className="h-5 w-5 text-neutral-500" />,
      link: "/projects",
    },
  ];

  return (
    <BentoGrid className="grid grid-cols-1 gap-4 md:grid-cols-3 max-w-4xl mx-auto m-4">
      {items.map((item, i) => (
        <div
          key={i}
          onClick={() => navigate(item.link)}
          className={`cursor-pointer transition-transform hover:scale-[1.02] ${
            i === 1 || i === 2 ? "md:col-span-2" : ""
          }`}
        >
          <BentoGridItem
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
          />
        </div>
      ))}
    </BentoGrid>
  );
}

const Skeleton = ({ img }) => (
    <div
      className="flex flex-1 w-full min-h-[9rem] rounded-xl bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${img})`,
      }}
    ></div>
  );
  
