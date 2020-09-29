const director = async (req, res) => {
  res.json({
    title: "Words from the Director",
    paragraphs: [
      'Caitlin is an aspiring clinician scientist with a graduate degree in dance and undergraduate degrees in kinesiology and psychology. She is currently in her final year of study in Occupational Therapy at the University of Toronto.',
      'Caitlin is a Pilates Mat Instructor certified through Body Harmonics. She has taught dance for 15 years for students of all ages from young children to adults in studios and for programs across Ontario. A highlight of her training was the 3 months Caitlin spent in New York City studying at Broadway Dance Center as part of their International Student Visa Program.',
      'The goal of Works in Progress Movement Studio is to combine dance and pilates in order to promote the benefits of movement in an accessible way.'
    ],
    signature: ['Movement Educator', 'Certified Personal Trainer (CanFitPro)', 'Certified Pilates Mat Instructor (Body Harmonics)']
  })
}

module.exports = {
  director
}