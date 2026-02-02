import nepo from '../assets/nepo.webp';
import working from '../assets/working.webp';
import tele from '../assets/tele.webp';
import jeju from '../assets/jeju.webp';
import laugh from '../assets/laugh.webp';
import building from '../assets/building.webp';
import car from '../assets/car.webp';
import city from '../assets/city.webp';
import computer from '../assets/computer.webp';
import dash from '../assets/dash.webp';
import highway from '../assets/highway.webp';
import truck from '../assets/truck.webp';

/**
 * Project data constants for the new tab-based Projects page
 * Based on requirements: 4 projects with multimedia content
 */

export const PROJECTS_DATA = [
  {
    id: 'naepo-digital-twin',
    tabLabel: '내포신도시 디지털 트윈',
    content: {
      title: 'Digital Twin Model for Naepo New City',
      subtitle: 'Korea\'s first traffic-focused digital twin for advanced mobility planning',
      overview: 'Dochak will position itself as a regional mobility innovation leader in Chungnam by using digital twins and simulation for traffic solutions. It will develop Korea\'s first traffic-focused digital twin for Naepo New City, supporting advanced mobility planning and operations.',
      keyFeatures: [
        'Traffic-focused digital twin development',
        'Advanced mobility planning and operations',
        'Demonstration and simulation facilities',
        'Local ecosystem collaboration',
        'Employment opportunity creation'
      ],
      benefits: [
        'Regional mobility innovation leadership',
        'Advanced ITS and mobility business expansion',
        'Local education and promotion programs',
        'Sustainable local ecosystem development'
      ],
      media: [
        {
          type: 'video',
          url: 'https://www.youtube.com/embed/zkzDjxeQpOI?si=2ejnZMeIT0rxDsdM',
          alt: 'Naepo Digital Twin demonstration video',
          title: 'Digital Twin Simulation',
          description: 'Real-time traffic simulation and planning visualization'
        },
        {
          type: 'image',
          url: nepo,
          alt: 'Naepo New City digital twin visualization',
          title: 'City Planning Overview'
        },
        {
          type: 'image',
          url: building,
          alt: 'Digital twin infrastructure',
          title: 'Infrastructure Mapping'
        }
      ],
      badges: [
        {
          text: '2025-Present',
          type: 'timeline',
          variant: 'primary'
        },
        {
          text: 'Ongoing',
          type: 'status',
          variant: 'warning'
        }
      ]
    }
  },
  {
    id: 'daejeon-jeju-tele-driving',
    tabLabel: '대전-제주간 원격주행',
    content: {
      title: 'Tele-driving between Daejeon and Jeju',
      subtitle: 'Remote driver intervention for autonomous vehicle safety',
      overview: 'Provides remote driver intervention when autonomous vehicles encounter issues, addressing limitations of autonomous systems. Enables safe operation in challenging environments such as heavy snow or construction zones.',
      keyFeatures: [
        'Remote driver intervention system',
        'Autonomous vehicle safety enhancement',
        'Challenging environment operation',
        'Multi-sector applicability',
        'Real-time remote control capabilities'
      ],
      benefits: [
        'Enhanced autonomous vehicle safety',
        'Operation in challenging weather conditions',
        'Cross-sector mobility applications',
        'Logistics and defense sector integration'
      ],
      media: [
        {
          type: 'video',
          url: '/videos/tele-driving-demo.mp4',
          alt: 'Tele-driving demonstration video',
          title: 'Remote Driving Technology',
          description: 'Demonstration of remote driver intervention capabilities'
        },
        {
          type: 'image',
          url: jeju,
          alt: 'Jeju Island route visualization',
          title: 'Route Planning'
        },
        {
          type: 'image',
          url: tele,
          alt: 'Tele-driving control interface',
          title: 'Control Interface'
        },
        {
          type: 'image',
          url: working,
          alt: 'Remote operation center',
          title: 'Operation Center'
        }
      ],
      badges: [
        {
          text: '2025-Present',
          type: 'timeline',
          variant: 'primary'
        },
        {
          text: 'Ongoing',
          type: 'status',
          variant: 'warning'
        }
      ]
    }
  },
  {
    id: 'daejeon-public-transport',
    tabLabel: '대전 3량 대중교통 운영',
    content: {
      title: 'Daejeon 3-car Public Transportation Operation',
      subtitle: 'Innovative multi-car transit system for urban mobility',
      overview: 'Advanced public transportation system featuring a 3-car configuration for efficient urban mobility. This innovative approach optimizes passenger capacity and operational efficiency while maintaining high service quality.',
      keyFeatures: [
        '3-car configuration system',
        'Optimized passenger capacity',
        'High operational efficiency',
        'Advanced scheduling algorithms',
        'Real-time monitoring and control'
      ],
      benefits: [
        'Increased passenger capacity',
        'Improved operational efficiency',
        'Enhanced service reliability',
        'Reduced operational costs',
        'Better urban mobility experience'
      ],
      media: [
        {
          type: 'video',
          url: 'https://www.youtube.com/embed/uuxF7u5UAL4?si=B7zfxrqZEJ8jr4EB',
          alt: 'Public transportation system demonstration',
          title: '3-Car Transit System',
          description: 'Demonstration of the multi-car transit system in operation'
        },
        {
          type: 'image',
          url: car,
          alt: '3-car transit system visualization',
          title: 'System Overview'
        },
        {
          type: 'image',
          url: city,
          alt: 'Urban transit network',
          title: 'Network Integration'
        },
        {
          type: 'image',
          url: computer,
          alt: 'Control system interface',
          title: 'Control System'
        }
      ],
      badges: [
        {
          text: '2025-Present',
          type: 'timeline',
          variant: 'primary'
        },
        {
          text: 'Ongoing',
          type: 'status',
          variant: 'warning'
        }
      ]
    }
  },
  {
    id: 'incheon-airport-parking',
    tabLabel: '인천공항 주차장 개선',
    content: {
      title: 'Incheon Airport Parking Improvement',
      subtitle: 'Smart parking solutions for enhanced airport experience',
      overview: 'Comprehensive parking system improvements for Incheon Airport, implementing smart parking technologies to enhance user experience and operational efficiency. The project focuses on intelligent parking management and user convenience.',
      keyFeatures: [
        'Smart parking management system',
        'Intelligent space allocation',
        'Real-time availability tracking',
        'Automated payment systems',
        'User-friendly mobile integration'
      ],
      benefits: [
        'Enhanced experience',
        'Improved efficiency',
        'Reduced congestion',
        'Optimized utilization',
        'Streamlined payments'
      ],
      media: [
        {
          type: 'video',
          url: '/videos/airport-parking-demo.mp4',
          alt: 'Airport parking system demonstration',
          title: 'Smart Parking System',
          description: 'Demonstration of intelligent parking management features'
        },
        {
          type: 'image',
          url: dash,
          alt: 'Parking management dashboard',
          title: 'Management Dashboard'
        },
        {
          type: 'image',
          url: highway,
          alt: 'Airport parking facility',
          title: 'Facility Overview'
        },
        {
          type: 'image',
          url: truck,
          alt: 'Smart parking technology',
          title: 'Technology Integration'
        }
      ],
      badges: [
        {
          text: '2025-Present',
          type: 'timeline',
          variant: 'primary'
        },
        {
          text: 'Ongoing',
          type: 'status',
          variant: 'warning'
        }
      ]
    }
  }
];

/**
 * Get project by ID
 * @param {string} projectId - The project ID to find
 * @returns {Object|null} The project object or null if not found
 */
export const getProjectById = (projectId) => {
  return PROJECTS_DATA.find(project => project.id === projectId) || null;
};

/**
 * Get all project IDs
 * @returns {string[]} Array of all project IDs
 */
export const getAllProjectIds = () => {
  return PROJECTS_DATA.map(project => project.id);
};

/**
 * Get default active project (first project)
 * @returns {string} ID of the default active project
 */
export const getDefaultActiveProjectId = () => {
  return PROJECTS_DATA[0]?.id || '';
}; 