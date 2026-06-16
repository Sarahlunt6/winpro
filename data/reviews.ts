export type Review = {
  id: number;
  name: string;
  quote: string;
  rating: number;
};

/**
 * Google reviews for the reviews carousel.
 * Format: First name + first initial of last name.
 */
export const reviews: Review[] = [
  {
    id: 1,
    name: "Mandy L.",
    quote:
      "These guys are the best! They did so much — and more than I expected! I haven't seen my windows look so good since they were new! We will have them back again and again for our windows!",
    rating: 5,
  },
  {
    id: 2,
    name: "Kinsey R.",
    quote:
      "This is the best window cleaning company ever!! I cannot recommend WinPro enough. My windows are sparkling clean and they go the extra mile to wipe down my windowsills and blinds. You will not regret hiring this team to clean your windows.",
    rating: 5,
  },
  {
    id: 3,
    name: "Brian W.",
    quote:
      "Grady and crew at WinPro LLC did an awesome job on our windows. They were professional, on time, and paid attention to every detail. The windows came out spotless and it honestly made the whole house feel brighter. Communication was great from start to finish and they were very respectful of our home. Highly recommend them to anyone looking for quality window cleaning service!",
    rating: 5,
  },
  {
    id: 4,
    name: "Taylor K.",
    quote:
      "Grady and his crew were amazing! They were super easy to work with, and my windows look perfect!",
    rating: 5,
  },
  {
    id: 5,
    name: "Joan M.",
    quote:
      "WinPro was on time, affordable, and did an outstanding job. My windows have never looked better. I would highly recommend them.",
    rating: 5,
  },
  {
    id: 6,
    name: "Kendra",
    quote:
      "Prompt, courteous, and left my windows sparkling. I decided to sign up for quarterly service.",
    rating: 5,
  },
];
