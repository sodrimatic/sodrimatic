/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Content Dictionary (English)
 * Single source of truth for all wedding copy across all sections.
 */

export const content = {
  // Navigation
  nav: {
    brand: "D&S",
    home: "HOME",
    ourStory: "OUR STORY",
    details: "DETAILS",
    meetUs: "PEOPLE",
    celebrate: "CELEBRATION",
    rsvp: "RSVP",
  },

  // Scene 0: Envelope Opening Invitation Intro
  intro: {
    kicker: "A LITTLE NOTE FOR A BIGGER CHAPTER",
    together: "DHRITI & SOHAM",
    foreverBegins: "our forever begins",
    openInvitation: "Open Invitation",
    subNote: "Tap seal or envelope to open",
    skip: "Skip Intro",
    replay: "Replay Invitation",
  },

  // Section 1: Gateway Hero
  hero: {
    coupleNames: "Dhriti & Soham",
    subtitle: "our forever begins",
    tagline: "Join the chaos and the vows",
  },

  // Section 2A: Conversational Chat Reveal
  chat: {
    kicker: "Leaked from the DMs",
    title: "The exact minute forever started",
    messages: [
      { sender: "bride", text: "I think we should tell this to everyone 💕", time: "10:12 AM" },
      { sender: "groom", text: "what?", time: "10:12 AM" },
      { sender: "bride", text: "that WE ARE GETTING MARRIED! 💍", time: "10:13 AM" },
      { sender: "groom", text: "Finally! It's been a long walk here 🥹", time: "10:13 AM" },
    ],
  },

  // Section 2B: Note From Us
  note: {
    kicker: "Our big day means nothing without you.",
    title: "A Little Note From Us",
    subtitle: "Well this is happening!",
    p1: "Somewhere between a thousand conversations, countless laughs, and a little bit of magic, we found each other. And now we're getting married.",
    p2: "We're so happy to have our favourite people here to celebrate with us. This little corner of the internet has all the details you need. The plans are coming together, the excitement is building, and we can't wait for great company, lots of laughter, and a little wedding-day magic.",
    closing: "With all our love,",
    couple: "Dhriti & Soham",
  },

  // Section 3: Wedding Details & Live Countdown
  scratch: {
    kicker: "SAVE OUR DATE & VENUE",
    title: "Wedding Details",
    subtitle: "our forever begins",
    venueLabel: "THE VENUE",
    venueName: "Banquet 9",
    venueAddress: "Evershine Mall, Chincholi Bunder, New Link Road, Malad West, Mumbai",
    timing: "Celebrations begin at 4:30 PM",
    timingTag: "EVENING",
    directions: "Directions ↗",
    revealedPrefix: "our wedding date is:",
    revealedDate: "12 February 2027",
    revealedLocation: "Friday · Mumbai",
    countdownTitle: "The Countdown Begins",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    subDays: "DAYS",
    subHours: "HOURS",
    subMins: "MINS",
    subSecs: "SECS",
  },

  // Section 4: Meet the Bride & Groom & Families
  people: {
    sectionTitle: "Meet the Bride & Groom",
    sectionSubtitle: "THE TWO SOULS BEHIND THIS CELEBRATION",
    familiesSubtitle: "Two different worlds, one beautiful story",
    brideFamily: {
      familySurname: "THE SHAH FAMILY",
      grandparentsLabel: "GRANDPARENTS",
      grandparents: [
        "Dashrathlal Khemchandlal Shah",
        "Jyotsna Dashrathlal Shah",
      ],
      parentsLabel: "PARENTS",
      parents: [
        "Kalpesh Dashrathlal Shah",
        "Ami Kalpesh Shah",
      ],
      siblingsLabel: "SIBLING",
      siblings: [
        "Vedant Kalpesh Shah",
      ],
    },
    groomFamily: {
      familySurname: "THE MEHTA FAMILY",
      grandparentsLabel: "GRANDPARENTS",
      grandparents: [
        "Rameshchandra Mehta",
        "Ritaben Rameshchandra Mehta",
      ],
      parentsLabel: "PARENTS",
      parents: [
        "Manish Rameshchandra Mehta",
        "Jigna Manish Mehta",
      ],
      siblingsLabel: "SIBLING",
      siblings: [
        "Kewal Manish Mehta",
      ],
    },
  },

  // Section 5: Celebration Lounge Hub
  celebrationHub: {
    kicker: "THE CELEBRATION LOUNGE",
    title: "Celebration Lounge",
    subtitle: "Cheer for the couple, shower your blessings, and explore our memory wall ♡",
    tabTugOfWar: "Tug of War",
    tabBlessings: "Shower of Blessings",
    tabGallery: "Memory Wall",
  },

  // Section 5A: Tug of War
  tugOfWar: {
    title: "Tug of War",
    brideCountLabel: "Team Bride",
    groomCountLabel: "Team Groom",
  },

  // Section 5B: Shower of Blessings
  blessings: {
    title: "Shower of Blessings",
    placeholder: "Write your heartfelt blessing for Dhriti & Soham...",
  },

  // Section 5C: Memory Wall
  memoryWall: {
    title: "Memory Wall",
    uploadBtn: "UPLOAD A PHOTO →",
    uploadTitle: "Add Your Memory to Our Wall",
    dragPrompt: "Click or tap to choose a photo from camera roll",
    cancel: "Cancel",
    submitting: "Uploading to Memory Wall...",
    submitPhoto: "Save Memory",
    polaroidSticky: "Good People · Better Memories ♡",
  },

  // Section 6: RSVP Form
  rsvp: {
    kicker: "KINDLY FAVOR US WITH YOUR REPLY",
    title: "Will You Join Our Celebration?",
    nameLabel: "Your Full Name",
    namePlaceholder: "e.g. Aakash & Ritu Shah",
    attendingLabel: "Are you attending?",
    yes: "Joyfully Accepts",
    no: "Regretfully Declines",
    messageLabel: "A Note for Dhriti & Soham",
    messagePlaceholder: "Write your personal note for the couple...",
    submit: "CONFIRM RSVP",
    submitting: "Submitting...",
    successTitle: "RSVP Received",
    errorNotice: "Something went wrong. Please try again.",
  },
};

// Backwards compatibility alias if accessed via content.en
content.en = content;

export default content;
