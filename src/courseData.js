// Import product images from assets
import visum from './assets/visum.webp';
import vissimImage from './assets/Simulation-in-PTV-VISSIM-software.webp';
import vistro from './assets/vistro.webp';
import simulatorCourse from './assets/simulator_course.webp';
import unity3D from './assets/unity3D.webp';
import digitalTwin from './assets/twin.webp';

export const courseData = {
  'ind-001': {
    title: 'Individual Training',
    code: 'IND-001',
    product: 'General',
    level: 'Individual',
    image: simulatorCourse,
    description: 'On request, <strong>PTV</strong> also offers individually tailored training programs, either at one of our professional training venues or at a place of your choosing.',
    content: 'When organizing <strong>individual trainings</strong>, we consider your needs, paying close attention to the skill levels of you and your colleagues. Our expert trainers are at your side to answer project specific questions and assist with working out the appropriate solutions. Benefit from an <em>efficient, hands-on training</em> with your individual project and work requirements.',
    targetGroup: 'Our individual training is suited to those who already use our software solutions but require a tailored training. This is also perfect for those interested in seeing the potential of our solutions for their project needs but don\'t use a PTV product today.',
    prerequisites: 'Prerequisites depend on the agreed course content and can be adopted to your needs. Courses can be adjusted to a group with varying experience and demands.',
    duration: 'Customizable',
    contents: ['A detailed training program will be discussed with you prior to the training.'],
    advantages: [
      '<strong>Customized Training:</strong> Training sessions are designed to meet the staff\'s specific skill level',
      '<strong>Adaptive Learning:</strong> Learning targets are adjusted to progress and need',
      '<strong>On-site Flexibility:</strong> Classes can take place at the client\'s location using the technical facilities available',
      'Flexible Scheduling: <em>Convenient timing</em> that fits your organization\'s needs',
      'Cost-efficiency: Saving of travel expenses for several participants'
    ],
    pricing: 'For more information about our individual training, please contact us.'
  },

  // Visum Courses
  'tr-t0101': {
    title: 'Visum Introduction',
    code: 'TR-T0101',
    product: 'Visum',
    level: 'Basic',
    image: visum,
    description: 'You will learn how to handle the <strong>network objects</strong> and the processing of demand matrices. Moreover, operating various graphical analyses and evaluations is in the focus.',
    content: 'We will acquaint you with the description of <strong>procedure sequences</strong> including the procedures for private transport assignment as well as a common procedure for public transport assignment. We will use the <span class="tech-term">PTV Visum Scenario manager</span> to illustrate how to construct a base scenario and multiple planning scenarios and how to work with these scenarios. <div class="key-info-box"><div class="title">Important Note</div>This course serves as the <strong>basis for any PTV Visum application</strong> and further training courses. Participation in this training course is required for future use of the Technical PTV Visum support service due to the maintenance contract.</div>',
    targetGroup: 'The PTV Visum introductory course addresses to transport planners with academic professional knowledge in the fields of transport planning and engineering or with practical experience in traffic and transport expertises. To specialist engineers, this training course provides an introduction into the PTV Visum practice for efficient processing and evaluation of traffic studies by means of a standard software.',
    prerequisites: 'You are familiar with the standard Office software tools (MS-Excel, MS-Word, OpenOffice.org, LibreOffice) that run with the operating system MS-Windows. You are able to use a conventional text editor (Notepad, Editor, TextPad, Notepad ++, etc.) for data editing. According to your professional background or due to your practical experience you are well-grounded in the field of transport planning.',
    duration: '3 Days',
    contents: [
      '<strong>Day 1:</strong> Introduction to the fundamentals of transport planning and to <span class="tech-term">PTV Visum</span>, PTV Visum network model - structure and processing, PTV Visum network check and validation, Network data import from third-party systems (e.g. shape file import), PTV Visum graphic parameters – simple introduction',
      '<strong>Day 2:</strong> <em>Assignment procedures</em> – Modeling of route choice decisions for private transport, Volume-delay functions, Impedance functions, Assignment procedures in detail: <span class="tech-term">Incremental assignment</span>, <span class="tech-term">Equilibrium assignment</span>, Equilibrium assignment LUCE, Equilibrium_Lohse, Overview of further assignment procedures: Stochastic assignment, Dynamic User Equilibrium DUE, Dynamic stochastic assignment, Simple public transport assignment procedure for PuT demand segments, <strong>Scenario management</strong> (project definition), Definition of the base application case, Generation of scenarios and description of the dependencies',
      '<strong>Day 3:</strong> PTV Visum presentation of the results, <em>Graphical visualization</em> of the assignment results as flow bundles, isochrones, turn volumes, or one of the difference display variants, Layout of maps and plans, <span class="tech-term">Skim matrices and vectors</span>: Travel time, travel distance, access and egress times, Matrix classification: Distributions of travel times and travel distances, Matrix correction by TFlowFuzzy, Skim value-based difference calculation for the assessment of the scenarios, Print output of the training course results'
    ]
  },

  'tr-t0102': {
    title: 'Visum Introduction PuT',
    code: 'TR-T0102',
    product: 'Visum',
    level: 'Basic',
    image: visum,
    description: 'Primarily you work in the area of private transport modeling. Additionally, you would like to know how to handle the network objects which are required for modelling public transport networks.',
    content: 'You will learn the fundamentals of public transport supply modelling. Moreover, how to connect the public transport demand and supply in PTV Visum will be explained. This training course serves as the basis for the use of the basic public transport functionality in PTV Visum. Users who are interested in detailed public transport modeling are recommended to attend the two-day Public Transport basic training course which includes both supply and demand.',
    targetGroup: 'The course addresses Visum users, who want to include components of public transport into their network models.',
    prerequisites: 'You successfully participated in our basic course "PTV Visum - Introduction to Macroscopic Network Modelling" (TR-T0101) or have similar experience with PTV Visum. With your professional background and practical experience you are well-grounded in the field of transport planning.',
    duration: '1 Day',
    contents: [
      'Fundamentals of how to model the elements of the public transport supply side',
      'Public transport stops and their structure',
      'PT lines and line routes',
      'Regular services and timetables',
      'Vehicle types',
      'Fundamentals of modeling and analyzing PT demand',
      'Connectors',
      'Assignment procedure methods for public transport',
      'Calculation of public transport-specific skims and their tabular and graphical display'
    ]
  },

  'tr-t0103': {
    title: 'Visum PuT Supply and Demand',
    code: 'TR-T0103',
    product: 'Visum',
    level: 'Basic',
    image: visum,
    description: 'PTV Visum provides various functions for analysis, planning, visualization and evaluation of PuT supply. One of the main characteristics of PTV Visum is that it allows you to model both PuT supply and demand and to combine the two subsystems.',
    content: 'Based on a road network model, you will learn how to model all basic PuT supply elements, e.g. stops, lines and timetables, vehicle types and operators. In addition, you will get to know how to visualize and analyze PuT model data in tables and graphs in PTV Visum. Based on an existing PuT supply model, you will learn how to adopt PuT demand data and combine it with supply data by applying several methods for passenger behavior simulation. We will thus focus on assignment procedures that allow us to determine passenger routes and calculate and display passenger volumes. Where useful, we will also look at procedures used to calculate and visualize the volume/capacity ratio of links, lines and vehicle trips. The course "Modelling Public Transport networks and combining supply and demand" impart the basics required for participation in our other PuT courses. This course serves as the basis for any PTV Visum application and further training courses.',
    targetGroup: 'Employees in planning departments of authorities, transport companies, transport associations and traffic planning offices that want to model and analyse PuT systems in detail.',
    prerequisites: 'No prerequisites. You ideally have experience with projects in PuT network and service planning.',
    duration: '2 Days',
    contents: [
      'Day 1: Adopting data from digital network models, Basics of network modelling (nodes, links, turns), Importing, creating and editing stops, stop areas and stop points, Interactive graphical creating and editing of lines and line routes, Creating and adjusting time profiles, Editing timetables in graphs and tables, Editing vehicle types, operators, valid days, Calculating skims from both the passenger\'s and operator\'s perspective',
      'Day 2: Basic sources and elements required to model PuT demand, Basics of the procedures for assignment of PuT demand matrices, Application cases and parameters of assignment procedures, Calculation of transport supply indicators and operating costs for evaluations, Tabular, graphical and map-based display of passenger demand indicators by stops, links, lines and vehicle journeys, furthermore display of the volume/capacity ratio by line or vehicle journey'
    ]
  },

  'tr-t0109': {
    title: 'Visum 4-Step Model',
    code: 'TR-T0109',
    product: 'Visum',
    level: 'Advanced',
    image: visum,
    description: 'One of the main uses of Visum is modeling transport demand. The most common travel forecasts analyse the daily travel behaviour of people.',
    content: 'These forecasts provide answers to the questions, when, how often, where and how do people travel. The standard 4-step model generally includes the steps trip generation, trip distribution, mode choice, and assignment. In Visum the variants 4-step model with sequential calculation and Nested demand model can be used. The two variants have in common that both trip generation and assignment are carried out in separate steps, either before or after calculation of the demand matrices. This two-day course will first introduce you to the various modelling methods. After describing all demand models available in PTV Visum, the course covers in detail the subjects of model segmentation, data supply, calibration and validation. The actual implementation of these subjects in PTV Visum is explained and participants practice with a training model.',
    targetGroup: 'The course provides an introduction to demand modelling, but is also aimed at users who already have experience with macroscopic traffic models and want to deepen their knowledge.',
    prerequisites: 'You successfully participated in our basic course "PTV Visum - Introduction to Macroscopic Network Modelling" (TR-T0101) or have similar experience with PTV Visum. You also have obtained practical project experience. It is of advantage if you attended our course "PTV Visum - Introduction to Public Transport Modelling" (TR-T0102) and have some basic knowledge of demand modelling.',
    duration: '2 Days',
    contents: [
      'Day 1: Model architecture, Discussing methods (4-stage model, VISEM, EVA), Model segmentation, Calculation process, Definition of the model area, Data supply, Required data and data sources (network-, behaviour- and structural data), Data preparation and organization, Interfaces for network data, Creating an 4-step example for practice, Matrix processing',
      'Day 2: PrT/PuT assignments, Calibration and validation, Parameter calibration for choice of destination and means of transport, Bottom-up validation of the model, Matrix calibration, Forecast calculation, Scenario Manager'
    ]
  },

  'tr-t0112': {
    title: 'Visum COM',
    code: 'TR-T0112',
    product: 'Visum',
    level: 'Advanced',
    image: visum,
    description: 'Some of the customers would like to add their own applications to the given PTV Visum functionality or embed PTV Visum in enterprise workflows.',
    content: 'Using the COM interface and a considerable object library giving access to almost any functionality of Visum, you have nearly unlimited possibilities for model processing on behalf of your specific purposes. This course will impart the basic knowledge of the COM model of PTV Visum. Course participants will learn how to control PTV Visum from external applications, run repeated processes automatically and how to create and implement simple applications in PTV Visum. The examples and exercises will use Python as the scripting language. A short recapitulation of Python language constructs is given.',
    targetGroup: 'The course addresses to experienced users with basic programming knowledge in engineering firms or transport associations who would like to improve the automation of certain processes to work more efficiently or develop their own specific functional PTV Visum extensions.',
    prerequisites: 'You successfully participated in our basic course "PTV Visum - Introduction to Macroscopic Network Modelling" (TR-T0101) or have similar experience with PTV Visum. Basic programming knowledge of any programming language is required. The course will be given with examples in Python.',
    duration: '1 Day',
    contents: [
      'Introduction to the COM model',
      'Fields of application for your own COM programs',
      'Short introduction to the programming language Python',
      'Programming environment and overview of the COM documentation',
      'Manipulating network objects and their properties',
      'Complex matrix processing',
      'Specific aspects of the COM interface (Public Transport, procedures, importing, …) on request',
      'Including scripts in PTV Visum',
      'Examples for the discussed COM applications',
      'Various exercises'
    ]
  },

  'tr-t0116': {
    title: 'Visum Visem',
    code: 'TR-T0116',
    product: 'Visum',
    level: 'Advanced',
    image: visum,
    description: 'The tour-based model Visem is a disaggregated, behavior-oriented demand model which allows the planner to include all kinds of data relating to socio-demography and traffic policy issues.',
    content: 'The tour-based model calculates three logical work unit: Trip generation, Trip distribution and Mode choice. These three logical units are not processed separately in succession by the tour-based model, but are interlocked. Especially steps 2 and 3, Trip distribution and Mode choice are carried out simultaneous in a single procedure. In all three work units two important concepts have been implemented for the tour-based model: Calculation on the basis of groups with homogeneous behavior and activity chains.',
    targetGroup: 'This course provides experienced users a deeper insight into demand modelling. It is aimed at users who already have basic knowledge of demand modelling and who want to extend it to the tour-based model / activity chain based model Visem.',
    prerequisites: 'You have successfully participated in our course "PTV Visum – Creating a 4-Step Transport Model" (TR-T0109) or have comparable knowledge of demand modelling in PTV Visum. You also have obtained practical project experience.',
    duration: '1 Day',
    contents: [
      'Demand modelling with Visem',
      'Principles and properties of the procedure',
      'Data structure',
      'Model architecture'
    ]
  },

  'tr-t0119': {
    title: 'Visum Freight Modelling',
    code: 'TR-T0119',
    product: 'Visum',
    level: 'Advanced',
    image: visum,
    description: 'Particularly in urban areas a large amount of traffic is caused as a result of economic activities. These include various trip purposes, such as the delivery and distribution of goods, the supply of construction materials and disposal of construction waste or the provision of services.',
    content: 'For modeling tour-based freight, there is a separate demand model available that includes the corresponding demand objects and procedures. Key elements of the model are based on the WIVER model (Sonntag, 1995), jointly developed by IVU and PTV in the 90s and applied in numerous transport models. This model allows you to model origin and destination traffic resulting from orders as well as interrelations between different industries. On this basis, you can then model how these orders are delivered in trips. The model provides the necessary data structures for modeling sector requirements and delivery concepts or vehicle types.',
    targetGroup: 'This course provides experienced users a deeper insight into demand modelling. It is aimed at users who already have basic knowledge of demand modelling and who want to extend it to the tour-based freight model.',
    prerequisites: 'You have successfully participated in our course "PTV Visum – Creating a 4-Step Transport Model" (TR-T0109) or have comparable knowledge of demand modelling in PTV Visum. You also have obtained practical project experience.',
    duration: '1 Day',
    contents: [
      'Demand modelling with Freight Modelling',
      'Principles and properties of the procedure',
      'Data structure',
      'Model architecture'
    ]
  },

  'tr-t0120': {
    title: 'Visum Nested Demand Modelling',
    code: 'TR-T0120',
    product: 'Visum',
    level: 'Advanced',
    image: visum,
    description: 'The nested logit approach, which underpins the Nested Demand Model, represents behavioural choices (typically trip distribution, mode choice and time of the day choice) in hierarchical model structures.',
    content: 'The appropriate hierarchy of choices must be determined by the relative sensitivities to the utilities of travel. Choices made higher in the hierarchy act as constraints on those made later further down the hierarchy. The calculation of utilities starts at the bottom of the hierarchy. The resulting log sums are passed on to the next level in the hierarchy adding one more choice at each level on the way up the hierarchy. This type of demand modelling is standard practice in the UK and is currently being used by the DfT\'s own National Transport Model with PTV Visum. This is therefore an ideal approach for modelling that is in line with DfT\'s and WebTAG recommendations.',
    targetGroup: 'This course provides experienced users with a deeper insight into TAG-compliant variable demand modelling. It is aimed at users who already have basic knowledge of variable demand modelling and who want to extend it to PTV Visum.',
    prerequisites: 'You have obtained practical project experience in TAG compliant variable demand modelling and successfully participated in our course „Introduction to macroscopic modelling with PTV Visum" (TR-T0101) or have comparable knowledge of demand modelling in PTV Visum.',
    duration: '1 Day',
    contents: [
      'Demand model with the Nested Logit approach',
      'Principles and properties of the procedure',
      'Choice model structure',
      'Utility functions',
      'Scaling parameters',
      'Gap calculation and model iteration',
      'Matrix operations'
    ]
  },

  'tr-t0124': {
    title: 'Visum Emissions',
    code: 'TR-T0124',
    product: 'Visum',
    level: 'Advanced',
    image: visum,
    description: 'Air pollution control and noise pollution are on everyone\'s lips and one of the biggest challenges. Cities, municipalities and legislators, as well as car manufacturers and other stakeholders involved in mobility, are working intensively on how to meet national and international targets and implement measures.',
    content: 'In this one-day course you will learn the basics of emissions in relation to noise and air. We will show you the possibilities to calculate pollutant emissions in passenger and freight traffic in PTV Visum on the basis of the Handbook for Emission Factors (HBEFA) published by the German Federal Environment Agency. Furthermore, we create noise emission calculations and emission maps for the emitter road based on RLS-19 (Richtlinien für den Lärmschutz an Straßen, Ausgabe 2019 / Guidelines for noise protection on roads, 2019 edition, published by FGSV) and fathom the possibilities to create noise reduction plans.',
    targetGroup: 'This course offers experienced users an introduction to theories and hands on examples of emission calculations with PTV Visum. It is targeted towards users who already gained basic knowledge of traffic modelling and want to expand it with emission calculations.',
    prerequisites: 'You succesfully attended our course "PTV Visum - Introduction to Macroscopic Network Modelling" (TR-T0101) or gained similar experience with PTV Visum. You also gained some practical project experience.',
    duration: '1 Day',
    contents: [
      'General about Emissions - Short introduction into the topic and the possibilities and limitations in PTV Visum',
      'Emissions calculation according to HBEFA - Emissions calculation for car and trucks based on assignment results, Emissions calculation for scheduled public transport busses based on time table data, Calculation of cold start excess emissions based on zone data, Statistical calculations (not analytical time intervalls), Definition and refining of demand segments and transport systems to create detailed analysis, Comparing scenarios',
      'Noise calculation according to RLS-19 (Emitter Road) - Definitions for noise calculation, Noise calculation based on assignment results, Presentation of noise emission maps, Presentation of noise reduction plans (comparing scenarios)'
    ]
  },

  'tr-t0125': {
    title: 'Visum ICA SBA',
    code: 'TR-T0125',
    product: 'Visum',
    level: 'Advanced',
    image: visum,
    description: 'Realistic impedance modelling for nodes premises that nodes are modelled in detail in a way that conflicts between turns can be identified correctly.',
    content: 'Transferred to Visum this means, that for these nodes the geometry and control need to be modelled in the junction editor. Subsequently, precise impedances and capacities of the turns can be calculated using the Intersection Capacity Analysis (ICA). Simulation-based dynamic assignment (SBA) is a dynamic assignment procedure that accounts for node impedances and allows users to model the forming and dissolving of queues over time. The supply and demand may be varied over time. Unlike other dynamic assignment procedures in Visum, the network is loaded with demand based on a simulation.',
    targetGroup: 'This course provides experienced users with a deeper insight into junction impedance-based highway assignment modelling. It is aimed at users who already have basic knowledge of PTV Visum and who are familiar with the principals of highway assignment model.',
    prerequisites: 'You successfully participated in our basic course "PTV Visum - Introduction to Macroscopic Network Modelling" (TR-T0101) or have similar experience with PTV Visum. You also gained some practical project experience in highway assignment modelling.',
    duration: '1 Day',
    contents: [
      'Intersection Capacity Analysis (ICA) - Principles and fundamentals, Junction coding for ICA nodes, The ICA assignment procedure, Convergence criteria, Input and output attributes, Understanding ICA results',
      'Simulation Based Assignment (SBA) - Steps of simulation-based dynamic assignment, Route search, Volume balancing, Simulation and network loading, Input and output attributes, Evaluation of assignment'
    ]
  },

  'tr-t0126': {
    title: 'PTV Visum - ABM Training for Modellers',
    code: 'TR-T0126',
    product: 'Visum',
    level: 'Advanced',
    image: visum,
    description: 'In this course, you will learn how to build an activity-based model (ABM) with PTV Visum, what data is required for it and how it can be used.',
    content: 'You will use examples to create a synthetic population, develop appropriate choice models and run an example model from start to finish. You will also develop policy questions to be tested in the model and learn how to analyze and visualize the results.',
    targetGroup: 'Modelers who have experience with PTV Visum and understand the setup steps for a 4-stage demand model. You will collaborate and develop an ABM in PTV Visum. It is helpful if you are familiar with the user interface and the processing of data via lists and objects.',
    prerequisites: 'Experience with PTV Visum and basic understanding of demand modeling',
    duration: '1 day',
    contents: [
      '01. Methodology - Workflow, Structure and population data, Choice model, Stable ABM, Advantages / disadvantages',
      '02. Network, structural data and parameters - Disaggregation to activity locations, Connectors, Assignment, Time-differentiated skims',
      '03. Synthetic population - Installation of PopulationSim, Configuration, Behavioral data, Import to PTV Visum',
      '04. Parameterization - Utility definition, Parameter adoption from macroscopic models',
      '05. Example calculations - Basic example, Scenario, Stable calculation',
      '06. Calibration',
      '07. Analysis tools'
    ]
  },

  'tr-t0130': {
    title: 'PTV Visum – Hybrid Macro-Meso Highway Assignment with SBA',
    code: 'TR-T0130',
    product: 'Visum',
    level: 'Advanced',
    image: visum,
    description: 'Realistic modelling for nodes requires them to be modelled such that conflicts between turns can be identified correctly.',
    content: 'In the Visum context, this means that the geometry and relevant control needs to be modelled in the junction editor. With this detail in place, Intersection Capacity Analysis (ICA) and mesoscopic simulation with SBA are possible. Simulation-based dynamic assignment (SBA) is a dynamic assignment procedure which loads demand using the simplified car-following simulation. The procedure is suited for medium-sized and large networks whose network model and demand are suitably modelled for dynamic applications. A recent development has been to allow for hybrid macro-meso assignment with SBA. This capability allows the possibility to create large-scale dynamic models with the flexibility to require the additional junction (node) detail only where the mesoscopic simulation is used.',
    targetGroup: 'Transport modellers familiar with highway assignment or microsimulation who are interested in how mesoscopic modelling can improve their workflows, and/or how hybrid macro-meso modelling can be applied at scale. It is aimed at users who already have basic knowledge of PTV Visum and who are familiar with the principles of highway assignment model.',
    prerequisites: 'You successfully participated in our basic course "PTV Visum - Introduction to Macroscopic Network Modelling" (TR-T0101) or have similar experience with PTV Visum. You also gained some practical project experience in highway assignment modelling.',
    duration: '1 Day',
    contents: [
      'Introduction to the Simulation-Based Assignment in PTV Visum',
      'Explanation of model development workflows'
    ]
  },

  'tr-t0140': {
    title: 'PTV Visum - Scenario Management: Tips & Tricks for traffic forecast (PL)',
    code: 'TR-T0140',
    product: 'Visum',
    level: 'Intermediate',
    image: visum,
    description: 'The training focuses on presenting the Scenario Manager as a modern form of traffic forecasting.',
    content: 'In the training, you will learn how the Scenario Manager tool can accelerate the traffic forecasting process and how to increase readability and control in your projects. During the training, all options and functionalities of the tool will be discussed, and then we will practice each of them together.',
    targetGroup: 'The course is directed to users who have experience working with traffic macro-models built in PTV Visum but have not used the Scenario Manager so far or have used it sporadically to a limited extent.',
    prerequisites: 'Knowledge of the basics of travel modeling (building supply and demand models) in PTV Visum, basic experience in building traffic forecasts.',
    duration: '1 Day',
    contents: [
      'Elements that make up traffic forecasts',
      'Scenario Manager (SM) – introduction and application in current work',
      'Creating a project in Scenario Manager (SM)',
      'SM options and functions, principles of relationships between elements',
      'Base model functions',
      'Modifications, procedures and graphic layouts',
      'Building scenarios',
      'Comparing traffic distribution results between different scenarios',
      'Creating global traffic parameters (e.g. concerning transport work) and comparing them between scenarios',
      'Tips & Tricks'
    ]
  },

  'tr-t0151': {
    title: 'PTV Visum - Introduction (US)',
    code: 'TR-T0151',
    product: 'Visum',
    level: 'Basic',
    image: visum,
    description: 'In this eight-hour course participants will explore the basic processes for setting up a private transportation travel demand model in PTV Visum.',
    content: 'Upon completion participants will understand how to build up the geometry of the network, configure the demand, run trip assignments, calibrate their assignments, and evaluate the data.',
    targetGroup: 'Travel demand modelers, Transportation Planners, Traffic Engineers',
    prerequisites: 'Background in travel demand modeling, or transportation planning.',
    duration: '8 hours (split into two 4-hour sessions)',
    contents: [
      'Creation of network objects',
      'Explore the attributes of the network objects',
      'Practice inserting travel demand',
      'Practice running trip assignment',
      'Performing basic analysis on the network',
      'Explore visualizing the results',
      'Practice comparing different scenarios'
    ]
  },

  'tr-t0170': {
    title: 'PTV Visum - Simulation Based Assignment for Mesoscopic and Hybrid Modelling',
    code: 'TR-T0170',
    product: 'Visum',
    level: 'Advanced',
    image: visum,
    description: 'Simulation-based dynamic assignment (SBA) is a dynamic assignment procedure that accounts for node impedances and allows users to model the forming and dissolving of queues over time.',
    content: 'The supply and demand may be varied over time. Unlike other dynamic assignment procedures in Visum, the network is loaded with demand based on a simulation. This means that individual vehicles are simulated and a simple car following model is applied to have the vehicles follow the paths they are assigned. The procedure is suited for medium-sized and large networks whose network model and demand are suitably modelled for dynamic applications.',
    targetGroup: 'This course addresses to experienced PTV Visum users from all disciplines.',
    prerequisites: 'You successfully participated in our basic course "PTV Visum - Introduction to Macroscopic Network Modelling" (TR-T0101) or have similar experience with PTV Visum.',
    duration: '1 day',
    contents: [
      'Introduction to the Fundamentals of SBA',
      'SBA Setup: Learn the essential steps to set up and run SBA in your projects',
      'Hybrid Macro-Meso Modelling: Understand how to combine macroscopic and mesoscopic models for comprehensive traffic analysis',
      '3D Visualization and SBA Result Analysis'
    ]
  },

  // Vissim Courses
  'tr-t0201': {
    title: 'Vissim Introduction',
    code: 'TR-T0201',
    product: 'Vissim',
    level: 'Basic',
    image: vissimImage,
    description: 'During this <strong>two-day course</strong> you will be introduced to <em>microscopic traffic flow simulation</em> with <span class="tech-term">PTV Vissim</span>. You will get to know the extensive functions of PTV Vissim and learn their application using practical examples.',
    content: 'In our <strong>introductory day</strong>, you will learn the basic functionality of <span class="tech-term">PTV Vissim</span>. At the end of the day you will be able to <em>build small network models independently</em> and perform initial evaluations. <br><br>On the <strong>second day</strong>, you will learn how to conduct high quality traffic studies much more efficiently using the microscopic simulation software PTV Vissim. You will get to know how the different calibrations of a traffic model are carried out and which factors must be considered. <div class="success-box">We offer a one-day basic add-on course <strong>"PTV Vissim – Scenario-Management, Evaluations and Visualization of Traffic Models" (TR-T0207)</strong> to deeper explore the above topics and learn additional features of PTV Vissim.</div>',
    targetGroup: 'PTV Vissim beginners as well as traffic engineers from cities and engineering firms that want to work on their projects at state-of-the-art level and efficiency.',
    prerequisites: 'No prerequisites.',
    duration: '2 Days',
    contents: [
      '<strong>Day 1:</strong> Objectives and tasks of <span class="tech-term">microscopic simulations</span>, <strong>Modelling of the transport supply side</strong> on the open road and at intersections (priority rules and signal control), <em>Modelling of the traffic demand</em> with input flows and route, Overview of public transport line modelling',
      '<strong>Day 2:</strong> Tasks involved in traffic studies with microscopic simulation, <strong>Required input data</strong> for supply and demand modelling, Overview of the empirical data which can be used for calibration, <em>Calibrating a PTV Vissim model</em>, Introduction to <span class="tech-term">Evaluation of a transport network/model</span>'
    ]
  },

  'tr-t0202': {
    title: 'Vissim VisVAP',
    code: 'TR-T0202',
    product: 'Vissim',
    level: 'Advanced',
    image: vissimImage,
    description: 'Would you like to design and test green time prolongations in private transport or public transport prioritization? The purpose of this one-day course is to show you the different types of vehicle-actuated signal control and their implementation using VisVAP in PTV Vissim.',
    content: 'Moreover, you will learn how to apply your VisVAP knowledge to other projects in a reasonable way.',
    targetGroup: 'Training course: Modelling Basics and Traffic Impact Studies using Microscopic Traffic Flow Simulation or a similar level of experience with PTV Vissim.',
    prerequisites: 'You successfully participated in our basic course "PTV Vissim – Introduction to Microscopic Traffic Flow Simulation" (TR-T0201) or have similar experience with PTV Vissim.',
    duration: '1 Day',
    contents: [
      'Fields of application of traffic-actuated signal controls',
      'Traffic-actuated signal control for private transport only',
      'Design of public transport priority schemes',
      'Use of VisVAP for other project types'
    ]
  },

  'tr-t0203': {
    title: 'Vissim Realistic Pedestrian Simulation with Viswalk',
    code: 'TR-T0203',
    product: 'Vissim',
    level: 'Basic',
    image: vissimImage,
    description: 'Do you want to integrate pedestrians into your PTV Vissim simulations and use PTV Viswalk, the tool for the realistic simulation of pedestrian flows? The purpose of this one-day course is to explain the theoretical details of pedestrian simulation and to show you how to develop a pedestrian flow model which allows you to carry out your projects efficiently and successfully.',
    targetGroup: 'The course addresses to traffic engineers who want to realistically simulate pedestrians in their models and planners of public transport stations and stops.',
    prerequisites: 'You successfully participated in our basic course "PTV Vissim - Introduction to Microscopic Traffic Flow Simulation" (TR-T0201) or have similar experience with PTV Vissim.',
    duration: '1 Day',
    contents: [
      'Fields of application for pedestrian simulations',
      'Modelling levels, ramps, stairs, escalators and elevators, e.g. at public transport stops',
      'Pedestrian-vehicle interaction: creating crosswalks and crosswalk signalization.',
      'Calibration and validation of simulations',
      'Evaluations of pedestrian simulations',
      'Performing evaluations and generating graphic overlays'
    ]
  },

  'tr-t0205': {
    title: 'Vissim COM',
    code: 'TR-T0205',
    product: 'Vissim',
    level: 'Advanced',
    image: vissimImage,
    description: 'Do you want to automate scenario calculations or does modelling in PTV Vissim come up against the limits of the software? The purpose of this course is to show you how to extend PTV Vissim capabilities by means of the COM interface.',
    content: 'The course starts with an introduction to Python and COM. Numerous examples will help you to become quickly familiar with COM programming in PTV Vissim.',
    targetGroup: 'This course addresses to experienced PTV Vissim users from all disciplines. In addition, programming experience is recommended.',
    prerequisites: 'You successfully participated in our basic course "PTV Vissim - Introduction to Microscopic Traffic Flow Simulation" (TR-T0201) or have similar experience with PTV Vissim. Basic programming knowledge is required. This course will be given with a focus on programming examples with Python. With sufficient general programming experience, you should be able to follow the course even if you don\'t master the programming language used by the teacher.',
    duration: '1 Day',
    contents: [
      'Explanation of the COM interface',
      'Introduction to the programming language Python',
      'Working with COM documentation and online help',
      'Modification of Vissim objects before and during the simulation on the basis of practice examples',
      'Application examples for large-scale COM applications'
    ]
  },

  'tr-t0206': {
    title: 'Vissim Dynamic Assignment / Meso',
    code: 'TR-T0206',
    product: 'Vissim',
    level: 'Advanced',
    image: vissimImage,
    description: 'If you have to model larger networks, it might be time-consuming and sometimes even difficult to enter the routes because the route choice depends on the signal control and traffic situation. Moreover, it might vary from scenario to scenario. The purpose of this course is to show you how dynamic assignment can assist you in solving this task efficiently.',
    content: 'In addition to network preparation and dynamic assignment, you will learn more about further fields of application based on examples.',
    targetGroup: 'This course addresses to experienced PTV Vissim users from all disciplines.',
    prerequisites: 'You successfully participated in our basic course "PTV Vissim - Introduction to Microscopic Traffic Flow Simulation" (TR-T0201) or have similar experience with PTV Vissim. Project experience is also recommended.',
    duration: '1 Day',
    contents: [
      'Typical fields of application for dynamic assignment and mesoscopic simulations',
      'Preparation of the simulation network, including parking lots, nodes and edges',
      'Demand modelling with matrices',
      'Path search model and destination choice model',
      'Convergence',
      'Mesoscopic fundamentals',
      'Combining a micro- and mesoscopic simulation in a hybrid simulation',
      'Evaluation of simulation results'
    ]
  },

  'tr-t0207': {
    title: 'Vissim Scenario Management, Evaluations, Visualization',
    code: 'TR-T0207',
    product: 'Vissim',
    level: 'Basic',
    image: vissimImage,
    description: 'In this course, we pick up the topics that are briefly explained in our introduction course "PTV Vissim – Introduction to Microscopic Traffic Flow Simulation" (TR-T0201) and extend them with further theory and practical examples.',
    content: 'We also cover the additional functions in PTV Vissim that are essential for professional traffic modelling. The extensive evaluation opportunities of traffic models in PTV Vissim are emphasized in this course. Moreover, efficient processing of projects with the scenario manager tool is another focus. You will also learn the modelling of parking lots and their effects on your simulation. Preparation of videos from the simulation and different presentation ideas of the results including various 3D models are also demonstrated.',
    targetGroup: 'PTV Vissim beginners who want to develop their knowledge and extend it with Vissim functions which are not covered in the introduction/introductory course.',
    prerequisites: 'You successfully participated in our basic course "PTV Vissim - Introduction to Microscopic Traffic Flow Simulation" (TR-T0201) or have similar experience with PTV Vissim.',
    duration: '1 Day',
    contents: [
      'Scenario Manager',
      'Parking Lots',
      '3D Models: import of vehicles and other structures from external sources',
      'Evaluations',
      'Creating 3D video with PTV Vissim'
    ]
  },

  'tr-t0208': {
    title: 'Vissim Public Transport and Pedestrians',
    code: 'TR-T0208',
    product: 'Vissim',
    level: 'Advanced',
    image: vissimImage,
    description: 'In this course we will show you how to model public transport networks in Vissim with the preparation of timetables, delay management and BRT and LRT modelling.',
    content: 'We will go through the integration of pedestrian transfer behaviour in a multimodal environment. In addition to network preparation, we will demonstrate best practices based on examples.',
    targetGroup: 'Traffic engineers, traffic planers, planners of public transport stops and stations who want to simulate public transport and pedestrians transfer behavior in a multimodal environment.',
    prerequisites: 'You should have successfully completed our course "Realistic pedestrian simulation" (TR-T0203) or have comparable experience with PTV Vissim.',
    duration: '1 Day',
    contents: [
      'Developing public transport Vissim networks, including lines, stops and signals',
      'Overview of Bus Rapid Transit (BRT and Light Rail Transit (LRT) modelling',
      'Timetable preparation and delay responsive departure management',
      'Transfer of pedestrians between different modes and levels',
      'Defining the opening position of doors of vehicles based on PT stop characteristics',
      'Configuring public transit vehicles',
      'Configuring transit stop passenger demand',
      'Evaluating transit operations'
    ]
  },

  'tr-t0209': {
    title: 'Vissim Complex Parking Scenarios',
    code: 'TR-T0209',
    product: 'Vissim',
    level: 'Advanced',
    image: vissimImage,
    description: 'In this course we show you the options available in PTV Vissim to model complex parking situations and the related vehicle behaviour.',
    content: 'We explore different parking techniques along with the interaction of parking vehicles as well as parking structures with public transport and other general traffic. In practice examples you will learn how to model multi-level parking and huge car parks. We will also discuss advanced parking options that go beyond PTV Vissim using the built-in COM interface to program own tools.',
    targetGroup: 'Experienced Vissim users who want to understand how to model complex parking scenarios in PTV Vissim.',
    prerequisites: 'You should have successfully completed our basic training course "PTV Vissim – Introduction to microscopic traffic flow simulation" (TR-T0201) or have comparable experience with PTV Vissim. Basic programming knowledge is required to follow the COM programming part.',
    duration: '1 Day',
    contents: [
      'Setting up a model including parking lots',
      'Link-based flows vs Dynamic Assignment',
      'Parking techniques',
      'Parking lot routing decisions',
      'Interaction of on-street parking vehicles with general traffic and public transport vehicles',
      'Introduction to the COM interface to demonstrate how to build sophisticated parking options: signs showing number of available spaces, signal head barrier at the entrance/exit, automated vehicle parking elevator system',
      'Key performance Indicators (KPI) from a model',
      'Multi-level parking',
      'Modelling large car parks'
    ]
  },

  'tr-t0210': {
    title: 'Vissim Roundabout Modelling',
    code: 'TR-T0210',
    product: 'Vissim',
    level: 'Advanced',
    image: vissimImage,
    description: 'In this half-day course, you will explore techniques for creating, evaluating, and calibrating roundabouts; including constructing the approaches and circulating lanes, configuring speed profiles throughout the roundabout, and calibrating custom lane change and gap acceptance behaviors.',
    targetGroup: 'Experienced PTV Vissim users from all disciplines.',
    prerequisites: 'You successfully participated in our basic course "PTV Vissim - Introduction to Microscopic Traffic Flow Simulation" (TR-T0201) or have equivalent experience generating microsimulation network models.',
    duration: 'Half Day',
    contents: [
      'Creating and editing the required physical network',
      'Configuring yielding movements',
      'Creating multi-lane roundabouts',
      'Evaluating a roundabout',
      'Calibrating gap acceptance',
      'Calibrating driving behaviors'
    ]
  },

  'tr-t0213-en': {
    title: 'PTV Vissim - Public Transport Modelling',
    code: 'TR-T0213-EN',
    product: 'Vissim',
    level: 'Advanced',
    image: vissimImage,
    description: 'Comprehensive course covering advanced public transport modelling techniques in PTV Vissim.',
    content: 'Learn to model complex public transport systems including bus rapid transit, light rail, and integrated multimodal networks.',
    targetGroup: 'Public transport planners and traffic engineers working on transit systems.',
    prerequisites: 'Experience with basic PTV Vissim functionality and public transport concepts.',
    duration: '1 Day',
    contents: [
      'Advanced public transport network modeling',
      'Bus Rapid Transit (BRT) and Light Rail Transit (LRT) systems',
      'Multimodal integration and passenger flows',
      'Performance evaluation and optimization'
    ]
  },

  'tr-t0215': {
    title: 'PTV Vissim – Microscopic Simulation for Automotive Engineering',
    code: 'TR-T0215',
    product: 'Vissim',
    level: 'Advanced',
    image: vissimImage,
    description: 'In this course, we show you how the microscopic simulation can be used for automotive engineering; How you can reproduce the connected & autonomous vehicles (CAV) behavior using internal model, how you can build the virtual environment where you can test your e.g. safety logic, fuel-saving model, fleet operation system, and how you can couple your external script/model/software as system under test.',
    content: 'The course will make use of the COM interface as well as the API package with Driver Model Interface, Driving Simulator Interface and external emissions model.',
    targetGroup: 'Experienced Vissim users who want to understand how to model CAV behavior or virtual test environments with PTV Vissim for the purpose of automotive engineering.',
    prerequisites: 'You successfully participated in our basic course "PTV Vissim - Introduction to Microscopic Traffic Flow Simulation" (TR-T0201) or have similar experience with PTV Vissim. Basic programming knowledge is required. This course will be given with a focus on programming examples with Python and C/C++. With sufficient general programming experience, you should be able to follow the course even if you don\'t master the programming language used by the teacher.',
    duration: '2 Days',
    contents: [
      'Day 1: Introduction - Purpose of automotive engineering/development, Benefit of traffic simulations for the virtual test, Vissim application for automotive industry, How to reproduce CAVs behavior (comparison between internal model, COM, API, DSI); Internal model training - Wiedemann\'s car following model, Adaptive Cruise Control model, Lane change & Lateral behavior model, Special setting for CAV (EABD, stochastics, platooning), Driver errors (Lack of attention, Distraction, Misestimation); COM training - COM Interface overview, Basic commands, Speed Camera, On-demand taxi, V2I Optimal speed',
      'Day 2: API training – Emission model - Emission model overview, Custom emission model; API training – Driver model - Driver model overview, Custom following model, Custom lane change model; DSI training - Driving Simulator Interface overview, Driving Simulator Text Client, Live In Unity example, External software example (like CarMaker, PreScan and so on), Build-in functionality to co-simulate with Vissim'
    ]
  },

  'tr-t0270': {
    title: 'PTV Vissim User Defined Attributes, Attribute Modifications and COM using Python',
    code: 'TR-T0270',
    product: 'Vissim',
    level: 'Advanced',
    image: vissimImage,
    description: 'Do you want to automate scenario calculations or does modelling in PTV Vissim come up against the limits of the software? The purpose of this course is to show you how to extend PTV Vissim capabilities by means of the COM interface.',
    content: 'The course starts with an introduction to Python and COM. Numerous examples will help you to become quickly familiar with COM programming in PTV Vissim.',
    targetGroup: 'This course addresses to experienced PTV Vissim users from all disciplines. In addition, programming experience is recommended.',
    prerequisites: 'You successfully participated in our basic course "PTV Vissim - Introduction to Microscopic Traffic Flow Simulation" (TR-T0201) or have similar experience with PTV Vissim. Basic programming knowledge is required. This course will be given with a focus on programming examples with Python. With sufficient general programming experience, you should be able to follow the course even if you don\'t master the programming language used by the teacher.',
    duration: '1 day',
    contents: [
      'User-Defined Attributes and Attribute Modifications - Creating and utilizing static user-defined attributes, Configuring vehicle attribute decisions based on default and user-defined attributes, Configuring formula-based routing to dynamically control vehicles based on specific attributes or network conditions, Configuring and utilizing attribute modifications to dynamically update network infrastructure and vehicle behavior based on simulation conditions',
      'Introduction to COM Interface using Python - Explanation of the COM interface, Introduction to the programming language Python, Working with COM documentation and online help, Modification of Vissim objects before and during the simulation on the basis of practice examples'
    ]
  },

  // Vistro Courses
  'tr-t0301': {
    title: 'Vistro Introduction',
    code: 'TR-T0301',
    product: 'Vistro',
    level: 'Basic',
    image: vistro,
    description: 'In our PTV Vistro Traffic Analysis course, you will learn how to conduct traffic studies, evaluate development impacts and optimize signals all with a single package.',
    content: 'We work with interactive examples of intersections, corridors, networks and development scenarios.',
    targetGroup: 'Traffic engineers and planners from public and private sectors who would like to carry out their traffic engineering projects efficiently, and in compliance with the latest standards.',
    prerequisites: 'A basic understanding of signal timing concepts is helpful, but not required.',
    duration: '1 Day',
    contents: [
      'Background images and BingTM Maps',
      'Network Setup',
      'Signal timing development',
      'LOS analysis with Highway Capacity Manual (HCM), Canadian Capacity Guide (CCG) and other methodologies',
      'Scenario management',
      'Signal timing optimization of intersections, corridors and networks',
      'Traffic impact analysis network setup',
      'Development trip tracking',
      'Mitigation analysis',
      'Creation of report-ready figures and output summaries',
      'Data import from other software packages',
      'Data export to PTV Vissim microsimulation'
    ]
  },

  // Visum Safety Course
  'tr-t0601': {
    title: 'Visum Safety',
    code: 'TR-T0601',
    product: 'Visum',
    level: 'Basic',
    image: visum,
    description: 'PTV Visum Safety is the tool for analysing accident data. With Visum Safety, it is possible to integrate aspects of traffic safety into strategic traffic planning decisions from the very beginning.',
    content: 'The software clearly visualises the accident data collected by the police and identifies black spots and high-risk areas. Detailed information about each individual accident allow users to find similarities and contributing factors to draw conclusions about causes and develop, plan and optimise effective and cost-efficient mitigation measures. You will learn how to use PTV Visum Safety in combination with the strategic traffic planning software PTV Visum to design coordinated assessment and planning stages. This allows different organisations like police, municipal services and traffic planners to work together towards the goal of a safer mobility.',
    targetGroup: 'The course is aimed at traffic planner, safety experts or anyone with an interest in how to implement traffic safety in your planning process with PTV Visum Safety.',
    prerequisites: 'Knowledge about traffic accident analysis are beneficial, skills in PTV Visum are not required.',
    duration: '1 Day',
    contents: [
      'Black Spot Management (BSM): Finding accident hot spots and investigating their causes',
      'Network Safety Management (NSM): Analyzing the network wide road safety situation',
      'Road Safety Impact Assessment (RIA): Using Accident prediction models (APMs) for the evaluation of future planning alternatives'
    ]
  },

  // Unity 3D Courses
  'tr-t0801': {
    title: 'Unity 3D - Unit Introduction and Setting up the Software',
    code: 'TR-T0801',
    product: 'General',
    level: 'Basic',
    image: unity3D,
    description: 'This introductory course provides participants with the fundamental knowledge needed to get started with Unity 3D for traffic simulation. Learn how to install, configure, and set up Unity for traffic simulation projects.',
    content: 'This course covers the essential setup and configuration steps for Unity 3D, including installation, project structure, and basic navigation. Participants will learn how to organize their workspace and prepare the development environment for traffic simulation projects.',
    targetGroup: 'Beginners who are new to Unity 3D and want to start working with traffic simulation environments. No prior Unity experience is required.',
    prerequisites: 'Basic computer skills and familiarity with Windows or macOS operating systems.',
    duration: 'Half Day',
    contents: [
      'Unity installation and system requirements',
      'Project creation and structure',
      'Unity interface overview',
      'Basic navigation and controls',
      'Setting up development environment',
      'Project organization best practices'
    ]
  },

  'tr-t0802': {
    title: 'Unity 3D - Basic Components I (Interface, Camera, Materials, Prefabs)',
    code: 'TR-T0802',
    product: 'General',
    level: 'Basic',
    image: unity3D,
    description: 'Learn the fundamental Unity components including interface navigation, camera setup, material creation, and prefab system. Essential skills for building 3D traffic simulation environments.',
    content: 'This course introduces core Unity concepts including GameObjects, camera configuration for traffic simulations, material creation and application, and the prefab system for efficient asset management.',
    targetGroup: 'Unity beginners and traffic simulation developers who need to understand basic Unity components.',
    prerequisites: 'Completion of Unity 3D - Unit Introduction and Setting up the Software (TR-T0801) or equivalent Unity basics knowledge.',
    duration: '1 Day',
    contents: [
      'Unity interface overview and customization',
      'Camera setup and configuration for traffic scenes',
      'Material creation and application',
      'Understanding GameObjects and Components',
      'Creating and using Prefabs',
      'Scene management basics'
    ]
  },

  'tr-t0803': {
    title: 'Unity 3D - Basic Components II (Collider, Lighting)',
    code: 'TR-T0803',
    product: 'General',
    level: 'Basic',
    image: unity3D,
    description: 'Master collision detection and lighting systems in Unity for realistic traffic simulation. Learn how to set up colliders for vehicles and infrastructure, and configure lighting for optimal visualization.',
    content: 'This course covers physics-based collision systems and advanced lighting techniques essential for creating realistic traffic simulation environments. Participants will learn to configure colliders, physics materials, and various lighting setups.',
    targetGroup: 'Unity users who want to implement realistic physics and lighting in traffic simulation projects.',
    prerequisites: 'Completion of Unity 3D - Basic Components I (TR-T0802) or equivalent knowledge.',
    duration: '1 Day',
    contents: [
      'Collider setup for traffic simulation',
      'Physics materials and interactions',
      'Lighting setup for realistic environments',
      'Shadow configuration and optimization',
      'Post-processing effects',
      'Performance optimization techniques'
    ]
  },

  'tr-t0804': {
    title: 'Unity 3D - Basic Components III (Scripting)',
    code: 'TR-T0804',
    product: 'General',
    level: 'Intermediate',
    image: unity3D,
    description: 'Introduction to C# scripting in Unity for traffic simulation. Learn to create scripts that control vehicle behavior, traffic flow, and simulation logic.',
    content: 'This course provides hands-on experience with C# scripting in Unity, covering script structure, component interaction, event handling, and basic animation programming for traffic simulation scenarios.',
    targetGroup: 'Unity users who want to add custom functionality and automation to their traffic simulation projects through scripting.',
    prerequisites: 'Completion of Unity 3D - Basic Components II (TR-T0803). Basic programming knowledge is helpful but not required.',
    duration: '1 Day',
    contents: [
      'Introduction to C# scripting in Unity',
      'Script structure and lifecycle',
      'Working with GameObjects and Components',
      'Event handling and inputs',
      'Basic animation concepts',
      'Scripting for traffic simulation'
    ]
  },

  'tr-t0805': {
    title: 'Unity 3D - Basic Components IV (UI Canvas, Importing Vehicle) / Design Proposal',
    code: 'TR-T0805',
    product: 'General',
    level: 'Intermediate',
    image: unity3D,
    description: 'Learn to create user interfaces and import vehicle models into Unity. This course also covers design proposal creation for traffic simulation projects.',
    content: 'This course teaches UI Canvas setup, vehicle model import procedures, and how to create design proposals for traffic simulation projects. Participants will learn best practices for asset integration and user interface design.',
    targetGroup: 'Unity developers working on traffic simulation projects that require user interfaces and vehicle asset integration.',
    prerequisites: 'Completion of Unity 3D - Basic Components III (TR-T0804) or equivalent knowledge.',
    duration: '1 Day',
    contents: [
      'UI Canvas setup and design',
      'Vehicle model import and setup',
      'Design proposal creation',
      'User Interface implementation',
      'Asset integration best practices',
      'Model optimization techniques'
    ]
  },

  'tr-t0806': {
    title: 'Unity 3D - User Interface',
    code: 'TR-T0806',
    product: 'General',
    level: 'Intermediate',
    image: unity3D,
    description: 'Advanced user interface design for traffic simulation applications. Learn to create intuitive and functional UIs for controlling and monitoring traffic simulations.',
    content: 'This course focuses on advanced UI/UX design principles for traffic simulation applications, including control panels, data visualization interfaces, and real-time monitoring dashboards.',
    targetGroup: 'Unity developers who need to create professional user interfaces for traffic simulation applications.',
    prerequisites: 'Completion of Unity 3D - Basic Components IV (TR-T0805) or equivalent UI knowledge.',
    duration: '1 Day',
    contents: [
      'Advanced UI design principles',
      'Creating control panels',
      'Data visualization interfaces',
      'Real-time monitoring dashboards',
      'UI animation and transitions',
      'Responsive UI design'
    ]
  },

  'tr-t0807': {
    title: 'Unity 3D - Building Road Environments (Terrain, Roads)',
    code: 'TR-T0807',
    product: 'General',
    level: 'Intermediate',
    image: unity3D,
    description: 'Learn to create realistic road environments using Unity\'s terrain system and road modeling tools. Build complete traffic simulation scenes with accurate road networks.',
    content: 'This course covers terrain creation, road network modeling, intersection design, and environment setup for traffic simulation. Participants will learn to create realistic road environments from scratch.',
    targetGroup: 'Traffic simulation developers and 3D artists who need to create realistic road environments in Unity.',
    prerequisites: 'Completion of Unity 3D - Basic Components II (TR-T0803) or equivalent knowledge.',
    duration: '1 Day',
    contents: [
      'Terrain creation and editing',
      'Road network modeling',
      'Intersection design',
      'Environment setup',
      'Texture and material application',
      'Road marking and signage'
    ]
  },

  'tr-t0808': {
    title: 'Unity 3D - Collecting Data from Real-world by Flying Drone',
    code: 'TR-T0808',
    product: 'General',
    level: 'Intermediate',
    image: unity3D,
    description: 'Learn to integrate drone-collected data into Unity for creating accurate 3D models of real-world environments for traffic simulation.',
    content: 'This course covers the process of collecting real-world data using drones and integrating that data into Unity. Participants will learn data processing workflows, coordinate system conversion, and 3D reconstruction techniques.',
    targetGroup: 'Traffic simulation developers and surveyors who need to create accurate 3D models from real-world drone data.',
    prerequisites: 'Completion of Unity 3D - Building Road Environments (TR-T0807). Basic knowledge of drone operations and GIS is helpful.',
    duration: '1 Day',
    contents: [
      'Drone data collection workflows',
      'Data formats and standards',
      'Coordinate system conversion',
      '3D reconstruction from point clouds',
      'Data integration into Unity',
      'Quality assurance and validation'
    ]
  },

  'tr-t0809': {
    title: 'Unity 3D - Data Post-processing',
    code: 'TR-T0809',
    product: 'General',
    level: 'Intermediate',
    image: unity3D,
    description: 'Advanced techniques for post-processing collected data for use in Unity traffic simulations. Learn to clean, optimize, and prepare data for 3D reconstruction.',
    content: 'This course covers data cleaning, optimization, format conversion, and preparation techniques for integrating various data sources into Unity traffic simulation projects.',
    targetGroup: 'Data specialists and Unity developers who work with real-world data in traffic simulation projects.',
    prerequisites: 'Completion of Unity 3D - Collecting Data from Real-world by Flying Drone (TR-T0808) or equivalent data processing knowledge.',
    duration: '1 Day',
    contents: [
      'Data cleaning techniques',
      'Data optimization methods',
      'Format conversion workflows',
      'Coordinate system transformation',
      'Data validation and quality control',
      'Automated processing pipelines'
    ]
  },

  'tr-t0810': {
    title: 'Unity 3D - Creating NPC Pedestrians using Navmesh & Animation Functions',
    code: 'TR-T0810',
    product: 'General',
    level: 'Advanced',
    image: unity3D,
    description: 'Learn to create realistic NPC (Non-Player Character) pedestrians using Unity\'s Navmesh system and animation functions for traffic simulation.',
    content: 'This course covers Navmesh navigation, pedestrian animation systems, behavior programming, and crowd simulation techniques for creating realistic pedestrian movements in traffic simulations.',
    targetGroup: 'Advanced Unity developers working on traffic simulation projects that require realistic pedestrian behavior.',
    prerequisites: 'Completion of Unity 3D - Basic Components III (TR-T0804) and Unity 3D - Building Road Environments (TR-T0807).',
    duration: '1 Day',
    contents: [
      'Navmesh setup and configuration',
      'Pedestrian animation systems',
      'Behavior programming',
      'Crowd simulation techniques',
      'Pathfinding and navigation',
      'Pedestrian-vehicle interactions'
    ]
  },

  'tr-t0811': {
    title: 'Unity 3D - Controlling Weather (Make a Rain)',
    code: 'TR-T0811',
    product: 'General',
    level: 'Intermediate',
    image: unity3D,
    description: 'Learn to create and control weather effects in Unity, including rain, for realistic traffic simulation scenarios.',
    content: 'This course covers weather system implementation, particle effects, environmental lighting adjustments, and dynamic weather control for traffic simulation scenarios.',
    targetGroup: 'Unity developers who need to implement weather effects in traffic simulation projects.',
    prerequisites: 'Completion of Unity 3D - Basic Components II (TR-T0803) or equivalent knowledge.',
    duration: 'Half Day',
    contents: [
      'Weather system implementation',
      'Rain particle effects',
      'Environmental lighting adjustments',
      'Dynamic weather control',
      'Performance optimization for weather effects',
      'Weather impact on traffic simulation'
    ]
  },

  'tr-t0812': {
    title: 'Unity 3D - Customizing Player Controller (Vehicle, Pedestrian, E-scooters)',
    code: 'TR-T0812',
    product: 'General',
    level: 'Advanced',
    image: unity3D,
    description: 'Advanced course on creating and customizing player controllers for different transportation modes including vehicles, pedestrians, and e-scooters in Unity.',
    content: 'This course covers physics-based vehicle controllers, pedestrian movement systems, e-scooter mechanics, input handling, and customization options for various transportation modes.',
    targetGroup: 'Advanced Unity developers creating traffic simulation projects with multiple transportation modes.',
    prerequisites: 'Completion of Unity 3D - Basic Components III (TR-T0804) and Unity 3D - Basic Components IV (TR-T0805).',
    duration: '1 Day',
    contents: [
      'Vehicle controller customization',
      'Pedestrian movement systems',
      'E-scooter mechanics and physics',
      'Input handling and customization',
      'Physics-based movement',
      'Multi-mode transportation integration'
    ]
  },

  'tr-t0813': {
    title: 'Unity 3D - Creating Surrounding Vehicles with Vissim',
    code: 'TR-T0813',
    product: 'General',
    level: 'Advanced',
    image: unity3D,
    description: 'Learn to integrate PTV Vissim traffic simulation data with Unity to create realistic surrounding vehicle traffic in 3D environments.',
    content: 'This course covers Vissim-Unity integration, real-time data exchange, vehicle spawning and control, synchronization techniques, and visualization of Vissim simulation results in Unity.',
    targetGroup: 'Advanced traffic simulation developers who need to integrate Vissim simulations with Unity 3D visualization.',
    prerequisites: 'Completion of Unity 3D - Basic Components III (TR-T0804). Experience with PTV Vissim is required.',
    duration: '1 Day',
    contents: [
      'Vissim-Unity integration setup',
      'Real-time data exchange',
      'Vehicle spawning and control',
      'Synchronization techniques',
      'Visualization of Vissim results',
      'Performance optimization'
    ]
  },

  'tr-t0814': {
    title: 'Unity 3D - Integrating with VR Simulators',
    code: 'TR-T0814',
    product: 'General',
    level: 'Advanced',
    image: unity3D,
    description: 'Advanced course on integrating Unity traffic simulations with Virtual Reality (VR) simulators for immersive training and research applications.',
    content: 'This course covers VR integration, head-mounted display (HMD) setup, motion tracking, interaction systems, and optimization techniques for VR traffic simulation applications.',
    targetGroup: 'Advanced Unity developers and VR specialists working on immersive traffic simulation and training applications.',
    prerequisites: 'Completion of Unity 3D - Customizing Player Controller (TR-T0812). Basic VR knowledge is helpful.',
    duration: '1 Day',
    contents: [
      'VR integration setup',
      'Head-mounted display (HMD) configuration',
      'Motion tracking and interaction',
      'VR-specific optimization techniques',
      'Immersive traffic simulation design',
      'Performance optimization for VR'
    ]
  },

  // Co-Simulation Courses
  'tr-t0815': {
    title: 'Co-Simulation - Establishment of Building and Topographical Information',
    code: 'TR-T0815',
    product: 'General',
    level: 'Advanced',
    image: digitalTwin,
    description: 'Learn to establish building and topographical information for co-simulation and digital twin systems. This course covers BIM integration, terrain modeling, and spatial data management.',
    content: 'This course provides comprehensive training on building information modeling (BIM), topographical data acquisition and processing, 3D model integration, GIS integration, and terrain elevation modeling for co-simulation projects.',
    targetGroup: 'Advanced traffic engineers, simulation developers, and digital twin specialists working on integrated simulation systems.',
    prerequisites: 'Strong understanding of 3D modeling and GIS concepts. Experience with traffic simulation software is recommended.',
    duration: '1 Day',
    contents: [
      'Building information modeling (BIM) basics',
      'Topographical data acquisition and processing',
      '3D model integration',
      'Geographic information systems (GIS) integration',
      'Terrain and elevation modeling',
      'Spatial data management'
    ]
  },

  'tr-t0816': {
    title: 'Co-Simulation - Establishment of Traffic Flow through Linkage with Vissim',
    code: 'TR-T0816',
    product: 'General',
    level: 'Advanced',
    image: digitalTwin,
    description: 'Learn to establish traffic flow in co-simulation systems by linking with PTV Vissim. This course covers real-time data exchange, synchronization, and network model preparation.',
    content: 'This course covers Vissim-Unity integration setup, real-time data exchange protocols, traffic flow synchronization, network model preparation, and data communication interfaces for co-simulation projects.',
    targetGroup: 'Advanced traffic engineers and simulation developers working on co-simulation projects with Vissim.',
    prerequisites: 'Strong experience with PTV Vissim. Completion of Unity 3D - Creating Surrounding Vehicles with Vissim (TR-T0813) is recommended.',
    duration: '1 Day',
    contents: [
      'Vissim-Unity integration setup',
      'Real-time data exchange protocols',
      'Traffic flow synchronization',
      'Network model preparation',
      'Data communication interfaces',
      'Synchronization troubleshooting'
    ]
  },

  'tr-t0817': {
    title: 'Co-Simulation - Advancement of Simulation Modeling',
    code: 'TR-T0817',
    product: 'General',
    level: 'Advanced',
    image: digitalTwin,
    description: 'Advanced techniques for improving simulation modeling in co-simulation systems. Learn calibration, validation, optimization, and multi-scale simulation approaches.',
    content: 'This course covers advanced simulation techniques, model calibration and validation, performance optimization, multi-scale simulation approaches, and scenario management for co-simulation projects.',
    targetGroup: 'Advanced simulation developers and traffic engineers working on complex co-simulation systems.',
    prerequisites: 'Strong understanding of traffic simulation principles. Experience with multiple simulation platforms is recommended.',
    duration: '1 Day',
    contents: [
      'Advanced simulation techniques',
      'Model calibration and validation',
      'Performance optimization',
      'Multi-scale simulation approaches',
      'Scenario management',
      'Model quality assurance'
    ]
  },

  'tr-t0818': {
    title: 'Co-Simulation - Build a Digital Twin-based Simulator Program',
    code: 'TR-T0818',
    product: 'General',
    level: 'Advanced',
    image: digitalTwin,
    description: 'Comprehensive course on building complete digital twin-based simulator programs using co-simulation techniques. Learn system architecture, integration methodologies, and real-time data processing.',
    content: 'This course covers digital twin architecture, system integration methodologies, real-time data processing, visualization and rendering, and user interface development for digital twin simulator programs.',
    targetGroup: 'Advanced developers and engineers building complete digital twin systems for transportation applications.',
    prerequisites: 'Completion of previous co-simulation courses (TR-T0815, TR-T0816, TR-T0817). Strong programming and system integration experience.',
    duration: '2 Days',
    contents: [
      'Digital twin architecture',
      'System integration methodologies',
      'Real-time data processing',
      'Visualization and rendering',
      'User interface development',
      'System testing and validation'
    ]
  },

  'tr-t0819': {
    title: 'Co-Simulation - Extraction of Analysis Data',
    code: 'TR-T0819',
    product: 'General',
    level: 'Advanced',
    image: digitalTwin,
    description: 'Learn to extract analysis data from co-simulation systems. This course covers data extraction techniques, filtering, and preparation for analysis.',
    content: 'This course provides training on data extraction techniques, data filtering and preprocessing, format conversion, and automated extraction pipelines for co-simulation systems.',
    targetGroup: 'Data analysts and simulation developers who need to extract and process data from co-simulation systems.',
    prerequisites: 'Completion of Co-Simulation - Establishment of Traffic Flow through Linkage with Vissim (TR-T0816). Basic data processing knowledge.',
    duration: '1 Day',
    contents: [
      'Data extraction techniques',
      'Data filtering and preprocessing',
      'Format conversion',
      'Automated extraction pipelines',
      'Data validation',
      'Performance optimization'
    ]
  },

  'tr-t0820': {
    title: 'Co-Simulation - Data Analysis and Result Visualization',
    code: 'TR-T0820',
    product: 'General',
    level: 'Advanced',
    image: digitalTwin,
    description: 'Advanced course on analyzing co-simulation data and creating comprehensive visualizations. Learn statistical analysis methods, visualization techniques, and reporting.',
    content: 'This course covers analysis data processing, statistical analysis methods, result visualization and reporting, performance metrics and KPIs, and advanced visualization techniques for co-simulation results.',
    targetGroup: 'Data analysts, researchers, and simulation developers who need to analyze and visualize results from co-simulation systems.',
    prerequisites: 'Completion of Co-Simulation - Extraction of Analysis Data (TR-T0819). Basic statistics and data visualization knowledge.',
    duration: '1 Day',
    contents: [
      'Analysis data processing',
      'Statistical analysis methods',
      'Result visualization and reporting',
      'Performance metrics and KPIs',
      'Advanced visualization techniques',
      'Report generation'
    ]
  }
};
