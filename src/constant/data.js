export const menuItems = [
  {
    isHeadr: true,
    title: "menu",
  },
  {
    title: "Overview",
    icon: "heroicons-outline:home",
    link: "/overview",
  },
  // {
  //   title: "Profile",
  //   icon: "heroicons-outline:user",
  //   link: "profile",
  // },
  {
    title: "First Timers",
    icon: "heroicons-outline:user-add",
    link: "/first-timers",
  },
  {
    title: "Members",
    icon: "heroicons-outline:user-group",
    link: "/members-management",
  },
  {
    title: "Departments",
    icon: "mingcute:department-line",
    link: "/departments",
  },
  {
    title: "CIH management",
    icon: "mdi:home-group",

    isOpen: true,
    child: [
      {
        childtitle: "Zones",
        childlink: "/cih/zones",
      },

      {
        childtitle: "Centers",
        childlink: "/cih/centers",
      },
      {
        childtitle: "Reports",
        childlink: "/cih/reports",
      },
      {
        childtitle: "Events",
        childlink: "/cih/events",
      },
    ],
  },

  {
    title: "Outreach",
    icon: "bx:donate-heart",
    link: "/outreach",
  },
  {
    title: "Attendance",
    icon: "heroicons-outline:clipboard-check",
    link: "/attendance",
  },
  // { title: "Goals", icon: "bx:football", link: "/goals" },
  {
    title: "Meetings",
    icon: "bx:merge",
    link: "/meetings",
  },
  // {
  //   title: "Issue Management",
  //   icon: "heroicons-outline:user",
  //   link: "issue-management",
  // },
  // {
  //   title: "Events",
  //   icon: "bx:server",
  //   link: "/events",
  // },
  // {
  //   title: "Notifications",
  //   icon: "heroicons-outline:speakerphone",
  //   link: "/notifications",
  // },
  {
    title: "Appointments",
    icon: "bx:calendar-plus",
    link: "/appointments",
  },
  {
    title: "Venues",
    icon: "bx:buildings",
    link: "/venue-management",
  },
  // {
  //   title: "Chat Management",
  //   icon: "heroicons-outline:user",
  //   link: "chat-management",
  // },
  // {
  //   title: "Ancillary Services",
  //   icon: "heroicons-outline:user",
  //   link: "ancillary-services",
  // },
];

// menuseetins

export const ProfileMenu = [
  {
    label: "Profile",
    icon: "heroicons-outline:user",
    link: "#",
  },
  // {
  //   label: "Chat",
  //   icon: "heroicons-outline:chat",
  //   link: "chat",
  // },
  // {
  //   label: "Email",
  //   icon: "heroicons-outline:mail",
  //   link: "email",
  // },
  // {
  //   label: "Todo",
  //   icon: "heroicons-outline:chip",
  //   link: "todo",
  // },
  {
    label: "Settings",
    icon: "heroicons-outline:cog",
    link: "#",
  },
  // {
  //   label: "Price",
  //   icon: "heroicons-outline:credit-card",
  //   link: "pricing",
  // },
  // {
  //   label: "Faq",
  //   icon: "heroicons-outline:information-circle",
  //   link: "faq",
  // },
  {
    label: "Logout",
    icon: "heroicons-outline:login",
    link: "/",
  },
];
export const notifications = [];
export const message = [
  {
    title: "Wade Warren",
    desc: "Hi! How are you doing?.....",
    active: true,
    hasnotifaction: true,
    notification_count: 1,
    image: "user.png",
    link: "#",
  },
  {
    title: "Savannah Nguyen",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: false,
    image: "user2.png",
    link: "#",
  },
  {
    title: "Ralph Edwards",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: true,
    notification_count: 8,
    image: "user3.png",
    link: "#",
  },
  {
    title: "Cody Fisher",
    desc: "Hi! How are you doing?.....",
    active: true,
    hasnotifaction: false,
    image: "user4.png",
    link: "#",
  },
  {
    title: "Savannah Nguyen",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: false,
    image: "user2.png",
    link: "#",
  },
  {
    title: "Ralph Edwards",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: true,
    notification_count: 8,
    image: "user3.png",
    link: "#",
  },
  {
    title: "Cody Fisher",
    desc: "Hi! How are you doing?.....",
    active: true,
    hasnotifaction: false,
    image: "user4.png",
    link: "#",
  },
];

export const topMenu = [
  {
    isHeadr: true,
    title: "DASHBOARD",
  },
  {
    title: "Dashboard",
    icon: "heroicons-outline:home",
    link: "home",
  },
];

export const alertType = [
  {
    type: "dark",
  },
  {
    type: "primary",
  },

  {
    type: "secondary",
  },
  {
    type: "success",
  },
  {
    type: "info",
  },
  {
    type: "danger",
  },
  {
    type: "warning",
  },
];

export const alertType2 = [
  {
    type: "dark-light",
  },
  {
    type: "primary-light",
  },

  {
    type: "secondary-light",
  },
  {
    type: "success-light",
  },
  {
    type: "info-light",
  },
  {
    type: "danger-light",
  },
  {
    type: "warning-light",
  },
];

export const alertType3 = [
  {
    type: "dark",
    icon: "fluent:target-20-regular",
  },
  {
    type: "primary",
    icon: "fluent:target-20-regular",
  },

  {
    type: "secondary",
    icon: "heroicons-outline:support",
  },
  {
    type: "success",
    icon: "akar-icons:double-check",
  },
  {
    type: "t-info",
    icon: "heroicons-outline:information-circle",
  },
  {
    type: "danger",
    icon: "heroicons-outline:exclamation",
  },
  {
    type: "warning",
    icon: "heroicons-outline:ban",
  },
];
export const alertType4 = [
  {
    type: "dark-light",
    icon: "fluent:target-20-regular",
  },
  {
    type: "primary-light",
    icon: "fluent:target-20-regular",
  },

  {
    type: "secondary-light",
    icon: "heroicons-outline:support",
  },
  {
    type: "success-light",
    icon: "akar-icons:double-check",
  },
  {
    type: "info-light",
    icon: "heroicons-outline:information-circle",
  },
  {
    type: "danger-light",
    icon: "heroicons-outline:exclamation",
  },
  {
    type: "warning-light",
    icon: "heroicons-outline:ban",
  },
];
export const alertType5 = [
  {
    type: "dark-outline",
  },
  {
    type: "primary-outline",
  },

  {
    type: "secondary-outline",
  },
  {
    type: "success-outline",
  },
  {
    type: "info-outline",
  },
  {
    type: "danger-outline",
  },
  {
    type: "warning-outline",
  },
];
export const alertType6 = [
  {
    type: "dark-outline",
    icon: "fluent:target-20-regular",
  },
  {
    type: "primary-outline",
    icon: "fluent:target-20-regular",
  },

  {
    type: "secondary-outline",
    icon: "heroicons-outline:support",
  },
  {
    type: "success-outline",
    icon: "akar-icons:double-check",
  },
  {
    type: "info-outline",
    icon: "heroicons-outline:information-circle",
  },
  {
    type: "danger-outline",
    icon: "heroicons-outline:exclamation",
  },
  {
    type: "warning-outline",
    icon: "heroicons-outline:ban",
  },
];

export const trackingParcel = [
  {
    title: "Project start date",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    date: "Sep 20, 2021 ",
    time: "12:32 AM",
    status: "ok",
  },
  {
    title: "Project start date",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
    status: "ok",
  },
  {
    title: "Project start date",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
    status: "ok",
  },
  {
    title: "Project start date",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
  },
  {
    title: "Project start date",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
  },
  {
    title: "Project start date",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
  },
  {
    title: "Project start date",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
  },
];

export const TodoList = [
  {
    id: 1,
    image: require("@/assets/images/users/user-1.jpg"),
    title: "Amet minim mollit non deserunt ullam.",
    isDone: false,
  },
  {
    id: 2,
    image: require("@/assets/images/users/user-2.jpg"),
    title: "Amet minim mollit non deserunt ullam.",
    isDone: false,
  },
  {
    id: 3,
    image: require("@/assets/images/users/user-3.jpg"),
    title: "Amet minim mollit non deserunt ullam.",
    isDone: false,
  },
  {
    id: 4,
    image: require("@/assets/images/users/user-4.jpg"),
    title: "Amet minim mollit non deserunt ullam.",
    isDone: false,
  },
  {
    id: 5,
    image: require("@/assets/images/users/user-5.jpg"),
    title: "Amet minim mollit non deserunt ullam.",
    isDone: false,
  },
  {
    id: 6,
    image: require("@/assets/images/users/user-6.jpg"),
    title: "Amet minim mollit non deserunt ullam.",
    isDone: false,
  },
];

//  todo fillter
export const fillters = [
  {
    value: "all",
    name: "My Task",
    icon: "uil:image-v",
  },
  {
    value: "fav",
    name: "Starred",
    icon: "heroicons:star",
  },
  {
    value: "done",
    name: "Completed",
    icon: "heroicons:document-check",
  },
  {
    value: "trash",
    name: "Trash",
    icon: "heroicons:trash",
  },
  {
    name: "Team",
    icon: "heroicons:users",
    value: "team",
  },
  {
    name: "low",
    icon: "heroicons:flag",
    value: "low",
  },
  {
    name: "medium",
    icon: "heroicons:flag",
    value: "medium",
  },
  {
    name: "high",
    icon: "heroicons:flag",
    value: "high",
  },
  {
    name: "update",
    icon: "heroicons:refresh",
    value: "update",
  },
];

export const editCatagory = [
  {
    value: "team",
    label: "team",
  },
  {
    value: "low",
    label: "low",
  },
  {
    value: "medium",
    label: "medium",
  },
  {
    value: "high",
    label: "high",
  },
];

export const projectCatagory = [
  {
    value: "team",
    label: "team",
  },
  {
    value: "low",
    label: "low",
  },
  {
    value: "medium",
    label: "medium",
  },
  {
    value: "high",
    label: "high",
  },
];
export const assignOption = [
  {
    title: "Mahedi Amin",
    image: require("@/assets/images/avatar/av-1.svg"),
  },
  {
    title: "Sovo Haldar",
    image: require("@/assets/images/avatar/av-2.svg"),
  },
  {
    title: "Rakibul Islam",
    image: require("@/assets/images/avatar/av-3.svg"),
  },
  {
    title: "Moni Haldar",
    image: require("@/assets/images/avatar/av-4.svg"),
  },
  {
    title: "Pritom Miha",
    image: require("@/assets/images/avatar/av-5.svg"),
  },
  {
    title: "Simanta Kika",
    image: require("@/assets/images/avatar/av-6.svg"),
  },
];

export const titleMenu = [
  {
    value: "Mr",
    label: "Mr",
  },
  {
    value: "Mrs",
    label: "Mrs",
  },
  {
    value: "Miss",
    label: "Miss",
  },
];

export const LGAMenu = [
  {
    value: "Ideato South",
    label: "Ideato South",
  },
  {
    value: "Ideato North",
    label: "Ideato North",
  },
];

export const stateMenu = [
  {
    value: "Lagos",
    label: "Lagos",
  },
  {
    value: "Imo",
    label: "Imo",
  },
];
export const countryMenu = [
  {
    value: "Nigeria",
    label: "Nigeria",
  },
  {
    value: "Egypt",
    label: "Egypt",
  },
];

export const genderMenu = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];

export const employmentStatusMenu = [
  {
    value: "Employed",
    label: "Employed",
  },
  {
    value: "Unemployed",
    label: "Unemployed",
  },
];

export const nationalityMenu = [
  {
    value: "Nigeria",
    label: "Nigeria",
  },
  {
    value: "Ghana",
    label: "Ghana",
  },
];

export const stateOfOriginMenu = [
  {
    value: "Imo ",
    label: "Imo ",
  },
  {
    value: "Lagos",
    label: "Lagos",
  },
];

export const maritalStatusMenu = [
  {
    value: "Married",
    label: "Married",
  },
  {
    value: "Single",
    label: "Single",
  },
];

export const industryMenu = [
  {
    value: "Technology",
    label: "Technology",
  },
];

export const levelOfATSMenu = [
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
];
export const isCharterMemberMenu = [
  {
    value: true,
    label: "True",
  },
  {
    value: false,
    label: "False",
  },
];
export const CIHZoneMenu = [
  {
    value: "Chevron",
    label: "Chevron",
  },
  {
    value: "Akoka",
    label: "Akoka",
  },
];
export const affinityGroupMenu = [
  {
    value: "Choir",
    label: "Choir",
  },
  {
    value: "Single",
    label: "Single",
  },
];
export const departmentMenu = [
  {
    value: "Logistics",
    label: "Logistics",
  },
];

export const CIHAddressMenu = [
  {
    value: "Lekki",
    label: "Lekki",
  },
  {
    value: "Jakande",
    label: "Jakande",
  },
];

export const childrenDetailstable = [
  {
    label: "First Name",
    field: "firstName",
  },
  {
    label: "Last Name",
    field: "surName",
  },

  {
    label: "Gender",
    field: "gender",
  },

  {
    label: "DOB",
    field: "dateOfBirth",
  },
  {
    label: "Action",
    field: "action",
  },
];

export const venueMenu = [
  {
    value: "Lekki",
    label: "Lekki",
  },
  {
    value: "Jakande",
    label: "Jakande",
  },
];

export const attendeeMenu = [
  {
    value: "Tayo Adegoke",
    label: "Tayo Adegoke",
  },
  {
    value: "Femi Falana",
    label: "Femi Falana",
  },
];
