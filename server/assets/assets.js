// Remove imports for both .svg and .png files


// Set all the SVG and PNG assets to be empty or use a placeholder image
export const assets = {
    likedin_icon: "",
    star_icon: "",
    logo: "", // Removed reference to logo variable
    hiho: "",
    search_icon: "",
    cross_icon: "",
    upload_area: "",
    company_icon: "",
    resume_not_selected: "",
    resume_selected: "",
    microsoft_logo: "",
    walmart_logo: "",
    accenture_logo: "", // Removed accenture_logo variable
    app_main_img: "",   // Removed app_main_img variable
    play_store: "",
    app_store: "",
    back_arrow_icon: "",
    left_arrow_icon: "",
    right_arrow_icon: "",
    location_icon: "",
    money_icon: "",
    suitcase_icon: "",
    person_icon: "",
    facebook_icon: "",
    instagram_icon: "",
    twitter_icon: "",
    home_icon: "",
    add_icon: "",
    person_tick_icon: "",
    resume_download_icon: "",
    delete_icon: "",
    email_icon: "",
    lock_icon: "",
    samsung_logo: "",
    adobe_logo: "",
    amazon_logo: "",
};


export const ProjectCategories = [
    "Web Development",
    "Mobile App",
    "Data Science",
    "AI/ML",
    "UI/UX Design",
    "Game Development",
    "Blockchain",
    "E-commerce",
    "Education",
    "Health & Fitness"
];

export const ProjectLocations = [
    "Remote",
    "Global",
    "United States",
    "Europe",
    "Asia",
    "Africa",
    "Australia",
    "Canada",
    "Latin America"
];

export const ProjectDifficulties = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Expert"
];

// **NEW: Company Data**
export const Companies = [
    {
        _id: "innovatetech",
        name: "InnovateTech Solutions",
        email: "info@innovatetech.com",
        image: "", // Removed company_icon
    },
    {
        _id: "globalcommerce",
        name: "Global Commerce Inc.",
        email: "contact@globalcommerce.com",
        image: "", // Removed company_icon
    },
];


export const projectsData = [
    {
        _id: '3',
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
    {
        _id: '4',
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
];

// Sample data for Manage Projects Page
export const manageProjectsData = [
    { _id: 1, title: "AI-Powered Chatbot", date: 1729102298497, location: "Remote", participants: 20, companyId: "innovatetech" },
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
];

export const viewApplicationsPageData = [
    {
        _id: 1,
        name: "Richard Sanford",
        projectTitle: "AI-Powered Chatbot",
        location: "Remote",
        imgSrc: "", // Removed profile_img
        companyId: "innovatetech",
        solutionLink: "https://www.google.com",
    },
];
