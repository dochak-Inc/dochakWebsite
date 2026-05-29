// Solution route constants
export const SOLUTION_ROUTES = {
  OVERVIEW: '/solutions',
  NEXUS: '/solutions/nexus',
  PRISM: '/solutions/prism',
  VISTA: '/solutions/vista',
  REMOTE_DRIVING: '/solutions/remote-driving',
  MULTIMODAL_SIMULATOR: '/solutions/multimodal-simulator',
  DIGITAL_TWIN: '/solutions/digital-twin',
  TRAFFIC_SIMULATION_MODELLING: '/solutions/traffic-simulation-modelling'
};

// Solution slugs for URL generation
export const SOLUTION_SLUGS = {
  NEXUS: 'nexus',
  PRISM: 'prism',
  VISTA: 'vista',
  REMOTE_DRIVING: 'remote-driving',
  MULTIMODAL_SIMULATOR: 'multimodal-simulator',
  DIGITAL_TWIN: 'digital-twin',
  TRAFFIC_SIMULATION_MODELLING: 'traffic-simulation-modelling'
};

// Solution metadata for navigation
export const SOLUTION_METADATA = [
  {
    id: 'nexus',
    slug: SOLUTION_SLUGS.NEXUS,
    path: SOLUTION_ROUTES.NEXUS,
    titleKey: 'solutions.items.nexus.title',
    descKey: 'solutions.items.nexus.desc'
  },
  {
    id: 'prism',
    slug: SOLUTION_SLUGS.PRISM,
    path: SOLUTION_ROUTES.PRISM,
    titleKey: 'solutions.items.prism.title',
    descKey: 'solutions.items.prism.desc'
  },
  {
    id: 'vista',
    slug: SOLUTION_SLUGS.VISTA,
    path: SOLUTION_ROUTES.VISTA,
    titleKey: 'solutions.items.vista.title',
    descKey: 'solutions.items.vista.desc'
  },
  {
    id: 'remote-driving',
    slug: SOLUTION_SLUGS.REMOTE_DRIVING,
    path: SOLUTION_ROUTES.REMOTE_DRIVING,
    titleKey: 'solutions.items.teleDriving.title',
    descKey: 'solutions.items.teleDriving.desc'
  },
  {
    id: 'multimodal-simulator',
    slug: SOLUTION_SLUGS.MULTIMODAL_SIMULATOR,
    path: SOLUTION_ROUTES.MULTIMODAL_SIMULATOR,
    titleKey: 'solutions.items.multimodal.title',
    descKey: 'solutions.items.multimodal.desc'
  },
  {
    id: 'digital-twin',
    slug: SOLUTION_SLUGS.DIGITAL_TWIN,
    path: SOLUTION_ROUTES.DIGITAL_TWIN,
    titleKey: 'solutions.items.digitalTwin.title',
    descKey: 'solutions.items.digitalTwin.desc'
  },
  {
    id: 'traffic-simulation-modelling',
    slug: SOLUTION_SLUGS.TRAFFIC_SIMULATION_MODELLING,
    path: SOLUTION_ROUTES.TRAFFIC_SIMULATION_MODELLING,
    titleKey: 'solutions.items.trafficSimulationModelling.title',
    descKey: 'solutions.items.trafficSimulationModelling.desc'
  }
];
