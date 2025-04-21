
// **NEW: Company Data**
export const Companies = [
    

    {
        _id: "innovatetech",
        name: "InnovateTech Solutions",
        email: "info@innovatetech.com",
        image: company_icon,
    },
    {
        _id: "globalcommerce",
        name: "Global Commerce Inc.",
        email: "contact@globalcommerce.com",
        image: company_icon,
    },
    {
        _id: "datainsights",
        name: "Data Insights Corp.",
        email: "info@datainsights.com",
        image: company_icon,
    },
    {
        _id: "edutech",
        name: "EduTech Innovations",
        email: "contact@edutech.com",
        image: company_icon,
    },
    {
        _id: "healthtech",
        name: "HealthTech Solutions",
        email: "info@healthtech.com",
        image: company_icon,
    },
    {
        _id: "securechain",
        name: "SecureChain Solutions",
        email: "contact@securechain.com",
        image: company_icon,
    },
    {
        _id: "virtualed",
        name: "VirtualEd Games",
        email: "info@virtualed.com",
        image: company_icon,
    },
    {
        _id: "financewise",
        name: "FinanceWise",
        email: "contact@financewise.com",
        image: company_icon,
    },
    {
        _id: "tuneai",
        name: "TuneAI",
        email: "contact@tuneai.com",
        image: company_icon,
    },
    {
        _id: "greenpower",
        name: "GreenPower Solutions",
        email: "info@greenpower.com",
        image: company_icon,
    },
    {
        _id: "arcommerce",
        name: "ARCommerce",
        email: "contact@arcommerce.com",
        image: company_icon,
    },
    {
        _id: "linguaai",
        name: "LinguaAI",
        email: "contact@linguaai.com",
        image: company_icon,
    }
];


export const projectsData = [
    
        {
            _id: '1',
            title: "AI-Powered Chatbot",
            location: "Remote",
            difficulty: "Intermediate",
            companyId: "innovatetech", // Reference by ID
            description: `...`,
            prize: "$5,000",
            duration: "3 months",
            postedDate: 1729681667114,
            category: "AI/ML",
        },
        // ... other projects

    {
        _id: '1',
        title: "AI-Powered Chatbot",
        location: "Remote",
        difficulty: "Intermediate",
        companyId: "innovatetech", // Reference by ID
        description: `
        <p>Develop an AI-powered chatbot to enhance customer service and streamline communication.</p>
        <h2><strong>Key Features</strong></h2>
        <ol>
            <li>Natural Language Processing (NLP)</li>
            <li>Machine Learning (ML) for continuous improvement</li>
            <li>Integration with messaging platforms</li>
            <li>Personalized user experience</li>
            <li>Analytics dashboard</li>
        </ol>
        <h2><strong>Technologies Used</strong></h2>
        <ul>
            <li>Python</li>
            <li>TensorFlow</li>
            <li>Dialogflow</li>
            <li>React</li>
            <li>Node.js</li>
        </ul>`,
        prize: "$5,000",
        duration: "3 months",
        postedDate: 1729681667114,
        category: "AI/ML",
    },
    {
        _id: '2',
        title: "Mobile E-commerce App",
        location: "Global",
        difficulty: "Advanced",
        companyId: "globalcommerce", // Reference by ID
        description: `
        <p>Create a mobile e-commerce app to provide a seamless shopping experience for users worldwide.</p>
        <h2><strong>Key Features</strong></h2>
        <ol>
            <li>Product catalog with detailed descriptions and images</li>
            <li>Secure payment gateway integration</li>
            <li>User authentication and profile management</li>
            <li>Order tracking and notifications</li>
            <li>Push notifications for promotions and updates</li>
        </ol>
        <h2><strong>Technologies Used</strong></h2>
        <ul>
            <li>React Native</li>
            <li>Firebase</li>
            <li>Stripe</li>
            <li>GraphQL</li>
            <li>Redux</li>
        </ul>`,
        prize: "$10,000",
        duration: "6 months",
        postedDate: 1729681667114,
        category: "E-commerce",
    },
    {
        _id: '3',
        title: "Data Visualization Dashboard",
        location: "United States",
        difficulty: "Intermediate",
        companyId: "datainsights", // Reference by ID
        description: `
        <p>Develop an interactive data visualization dashboard to analyze and present key business metrics.</p>
        <h2><strong>Key Features</strong></h2>
        <ol>
            <li>Real-time data updates</li>
            <li>Customizable charts and graphs</li>
            <li>Data filtering and aggregation</li>
            <li>User-friendly interface</li>
            <li>Export data in various formats</li>
        </ol>
        <h2><strong>Technologies Used</strong></h2>
        <ul>
            <li>Python</li>
            <li>Tableau</li>
            <li>Power BI</li>
            <li>SQL</li>
            <li>Pandas</li>
        </ul>`,
        prize: "$7,500",
        duration: "4 months",
        postedDate: 1729681667114,
        category: "Data Science",
    },
    {
        _id: '4',
        title: "Web-Based Learning Platform",
        location: "Europe",
        difficulty: "Advanced",
        companyId: "edutech", // Reference by ID
        description: `
        <p>Create a web-based learning platform to provide online courses and educational resources.</p>
        <h2><strong>Key Features</strong></h2>
        <ol>
            <li>Course management system</li>
            <li>Interactive lessons and quizzes</li>
            <li>User progress tracking</li>
            <li>Video conferencing integration</li>
            <li>Certificate generation</li>
        </ol>
        <h2><strong>Technologies Used</strong></h2>
        <ul>
            <li>React</li>
            <li>Node.js</li>
            <li>MongoDB</li>
            <li>WebRTC</li>
            <li>AWS</li>
        </ul>`,
        prize: "$12,000",
        duration: "6 months",
        postedDate: 1729681667114,
        category: "Education",
    },
    {
        _id: '5',
        title: "AI-Powered Health Monitoring App",
        location: "Asia",
        difficulty: "Expert",
        companyId: "healthtech", // Reference by ID
        description: `
        <p>Develop an AI-powered health monitoring app to provide personalized health insights and recommendations.</p>
        <h2><strong>Key Features</strong></h2>
        <ol>
            <li>Wearable sensor integration</li>
            <li>AI-driven health analysis</li>
            <li>Personalized health recommendations</li>
            <li>Medication reminders</li>
            <li>Emergency alerts</li>
        </ol>
        <h2><strong>Technologies Used</strong></h2>
        <ul>
            <li>React Native</li>
            <li>TensorFlow Lite</li>
            <li>Bluetooth</li>
            <li>REST API</li>
            <li>AWS IoT</li>
        </ul>`,
        prize: "$15,000",
        duration: "9 months",
        postedDate: 1729681667114,
        category: "Health & Fitness",
    },
    {
        _id: '6',
        title: "Blockchain-Based Supply Chain Tracker",
        location: "Australia",
        difficulty: "Advanced",
        companyId: "securechain", // Reference by ID
        description: `
        <p>Design a blockchain-based system for tracking products throughout the supply chain.</p>
        <h2><strong>Key Features</strong></h2>
        <ol>
            <li>Immutable ledger for product tracking</li>
            <li>Real-time visibility into product movement</li>
            <li>Smart contracts for automated transactions</li>
            <li>Integration with IoT devices for data collection</li>
        </ol>
        <h2><strong>Technologies Used</strong></h2>
        <ul>
            <li>Ethereum</li>
            <li>Solidity</li>
            <li>IPFS</li>
            <li>Node.js</li>
            <li>Hyperledger Fabric</li>
        </ul>`,
        prize: "$8,000",
        duration: "5 months",
        postedDate: 1729681667114,
        category: "Blockchain",
    },
    {
        _id: '7',
        title: "VR Game for Education",
        location: "Latin America",
        difficulty: "Intermediate",
        companyId: "virtualed", // Reference by ID
        description: `
        <p>Develop a virtual reality game to enhance educational experiences.</p>
        <h2><strong>Key Features</strong></h2>
        <ol>
            <li>Immersive 3D environment</li>
            <li>Interactive learning modules</li>
            <li>Multiplayer support</li>
            <li>Gamified learning with rewards</li>
            <li>Adaptive difficulty levels</li>
        </ol>
        <h2><strong>Technologies Used</strong></h2>
        <ul>
            <li>Unity</li>
            <li>C#</li>
            <li>Blender</li>
            <li>VR SDKs (Oculus, Vive)</li>
        </ul>`,
        prize: "$6,000",
        duration: "4 months",
        postedDate: 1729681667114,
        category: "Game Development",
    },
    {
        _id: '8',
        title: "Personal Finance Management App",
        location: "Canada",
        difficulty: "Beginner",
        companyId: "financewise", // Reference by ID
        description: `
        <p>Create a simple and intuitive app to help users manage their personal finances.</p>
        <h2><strong>Key Features</strong></h2>
        <ol>
            <li>Income and expense tracking</li>
            <li>Budgeting tools</li>
            <li>Financial goal setting</li>
            <li>Report generation</li>
            <li>Bill payment reminders</li>
        </ol>
        <h2><strong>Technologies Used</strong></h2>
        <ul>
            <li>React Native</li>
            <li>Firebase</li>
            <li>Chart.js</li>
        </ul>`,
        prize: "$3,000",
        duration: "2 months",
        postedDate: 1729681667114,
        category: "E-commerce",
    },

    {
        _id: '9',
        title: "AI-Driven Music Recommendation System",
        location: "Remote",
        difficulty: "Advanced",
        companyId: "tuneai", // Reference by ID
        description: `
        <p>Build an AI-powered music recommendation system that suggests songs based on user listening habits.</p>
        <h2><strong>Key Features</strong></h2>
        <ol>
            <li>Collaborative filtering techniques</li>
            <li>Content-based recommendation</li>
            <li>Integration with music streaming APIs</li>
            <li>User feedback mechanism</li>
        </ol>
        <h2><strong>Technologies Used</strong></h2>
        <ul>
            <li>Python</li>
            <li>TensorFlow</li>
            <li>Spotify API</li>
            <li>Last.fm API</li>
        </ul>`,
        prize: "$9,000",
        duration: "5 months",
        postedDate: 1729681667114,
        category: "AI/ML",
    },
    {
        _id: '10',
        title: "Sustainable Energy Management System",
        location: "Africa",
        difficulty: "Expert",
        companyId: "greenpower", // Reference by ID
        description: `
        <p>Develop a system to manage and optimize the use of sustainable energy resources.</p>
        <h2><strong>Key Features</strong></h2>
        <ol>
            <li>Real-time monitoring of energy production</li>
            <li>Predictive analytics for energy demand</li>
            <li>Smart grid integration</li>
            <li>Remote control and automation</li>
        </ol>
        <h2><strong>Technologies Used</strong></h2>
        <ul>
            <li>Python</li>
            <li>IoT sensors</li>
            <li>Cloud platform (AWS, Azure)</li>
            <li>Machine learning algorithms</li>
        </ul>`,
        prize: "$11,000",
        duration: "7 months",
        postedDate: 1729681667114,
        category: "Web Development",
    },
    {
        _id: '11',
        title: "Augmented Reality Shopping Experience",
        location: "Global",
        difficulty: "Advanced",
        companyId: "arcommerce", // Reference by ID
        description: `
        <p>Create an augmented reality app that allows users to visualize products in their own environment before purchasing.</p>
        <h2><strong>Key Features</strong></h2>
        <ol>
            <li>AR product placement</li>
            <li>3D product modeling</li>
            <li>Integration with e-commerce platforms</li>
            <li>User customization options</li>
        </ol>
        <h2><strong>Technologies Used</strong></h2>
        <ul>
            <li>ARKit (iOS) or ARCore (Android)</li>
            <li>Unity</li>
            <li>3D modeling software</li>
        </ul>`,
        prize: "$13,000",
        duration: "6 months",
        postedDate: 1729681667114,
        category: "Mobile App",
    },
    {
        _id: '12',
        title: "AI-Powered Language Tutor App",
        location: "Asia",
        difficulty: "Intermediate",
        companyId: "linguaai", // Reference by ID
        description: `
        <p>Develop an app that uses AI to provide personalized language tutoring.</p>
        <h2><strong>Key Features</strong></h2>
        <ol>
            <li>Speech recognition</li>
            <li>Natural language processing</li>
            <li>Personalized lesson plans</li>
            <li>Progress tracking</li>
        </ol>
        <h2><strong>Technologies Used</strong></h2>
        <ul>
            <li>Python</li>
            <li>TensorFlow</li>
            <li>Speech recognition APIs</li>
        </ul>`,
        prize: "$7,000",
        duration: "4 months",
        postedDate: 1729681667114,
        category: "Education",
    }
];

// Sample data for Manage Projects Page
export const manageProjectsData = [
    { _id: 1, title: "AI-Powered Chatbot", date: 1729102298497, location: "Remote", participants: 20, companyId: "innovatetech" },
    { _id: 2, title: "Mobile E-commerce App", date: 1729102298497, location: "Global", participants: 15, companyId: "globalcommerce" },
    { _id: 3, title: "Data Visualization Dashboard", date: 1729102298497, location: "United States", participants: 22, companyId: "datainsights" },
    { _id: 4, title: "Web-Based Learning Platform", date: 1729102298497, location: "Europe", participants: 25, companyId: "edutech" }
];

// Sample data for Profile Page
export const projectsJoined = [
    {
        companyId: 'edutech',
        title: 'AI-Powered Chatbot',
        location: 'Remote',
        date: '22 Aug, 2024',
        status: 'Pending',
    },
    {
        companyId: 'globalcommerce',
        title: 'Mobile E-commerce App',
        location: 'Global',
        date: '22 Aug, 2024',
        status: 'Rejected',
    },
    {
        companyId: 'datainsights',
        title: 'Data Visualization Dashboard',
        location: 'United States',
        date: '25 Sep, 2024',
        status: 'Accepted',
    },
    {
        companyId: 'virtualed',
        title: 'Web-Based Learning Platform',
        location: 'Europe',
        date: '15 Oct, 2024',
        status: 'Pending',
    },
    {
        companyId: 'innovatetech',
        title: 'AI-Powered Chatbot',
        location: 'Remote',
        date: '25 Sep, 2024',
        status: 'Accepted',
    },
];

export const viewApplicationsPageData = [
    { _id: 1, name: "Richard Sanford", projectTitle: "AI-Powered Chatbot", location: "Remote", imgSrc: profile_img, companyId: "innovatetech" ,solutionLink: "https://www.google.com"},
    { _id: 2, name: "Enrique Murphy", projectTitle: "Mobile E-commerce App", location: "Global", imgSrc: profile_img, companyId: "globalcommerce",solutionLink: "https://www.google.com" },
    { _id: 3, name: "Alison Powell", projectTitle: "Data Visualization Dashboard", location: "United States", imgSrc: profile_img, companyId: "datainsights",solutionLink: "https://www.google.com" },
    { _id: 4, name: "Richard Sanford", projectTitle: "Web-Based Learning Platform", location: "Europe", imgSrc: profile_img, companyId: "edutech" , solutionLink: "https://www.google.com"},
    { _id: 5, name: "Enrique Murphy", projectTitle: "AI-Powered Chatbot", location: "Remote", imgSrc: profile_img, companyId: "innovatetech",solutionLink: "https://www.google.com" },
    { _id: 6, name: "Alison Powell", projectTitle: "Mobile E-commerce App", location: "Asia", imgSrc: profile_img, companyId: "globalcommerce",solutionLink: "https://www.google.com" },
    { _id: 7, name: "Richard Sanford", projectTitle: "Data Visualization Dashboard", location: "Africa", imgSrc: profile_img, companyId: "datainsights" ,solutionLink: "https://www.google.com"},
];