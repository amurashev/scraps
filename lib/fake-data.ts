const users = {
  male: [
    {
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: 'https://xsgames.co/randomusers/assets/avatars/male/1.jpg',
    },
    {
      firstName: 'Pablo',
      lastName:
        'Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso',
      avatarUrl: 'https://xsgames.co/randomusers/assets/avatars/male/2.jpg',
    },
    {
      firstName: 'Sam',
      lastName: 'Cooper',
      avatarUrl: 'https://xsgames.co/randomusers/assets/avatars/male/4.jpg',
    },
  ],
  female: [
    {
      firstName: 'Michel',
      lastName: 'Vain',
      avatarUrl: 'https://xsgames.co/randomusers/assets/avatars/female/3.jpg',
    },
  ],
}

export const getRandomUser = (index = 0, sex: 'male' | 'female' = 'male') => {
  return users[sex][index]
}

export type Company = {
  name: string
  logo: string
  location: string
}

const companies: Company[] = [
  {
    name: 'Quality Standards',
    logo: '/images/logos/quality.png',
    location: 'Paris, France',
  },
  {
    name: 'Check Icon & Success',
    logo: '/images/logos/correct.png',
    location: 'London, UK',
  },
  {
    name: 'ThreeBook',
    logo: '/images/logos/books.png',
    location: 'San Francisco, USA',
  },
  {
    name: 'Hats',
    logo: '/images/logos/mortarboard.png',
    location: 'New York, USA',
  },
  {
    name: 'Flat Computer Ind.',
    logo: '/images/logos/imac.png',
    location: 'Berlin, Germany',
  },
  {
    name: 'Leaves and nature',
    logo: '/images/logos/leaves.png',
    location: 'Lisbon, Portugal',
  },
]

export const getRandomCompany = (index = 0) => {
  return companies[index]
}

const articles = [
  {
    title: 'Thailand: The Land of Smiles, Spicy Food, and Unexpected Surprises',
    text: "Welcome to Thailand, a country where the smiles are as warm as the weather, the food is as spicy as your wildest dreams, and the surprises come at you faster than you can say 'Pad Thai.' Buckle up for a humorous ride through some of the quirkiest aspects of this incredible country!",
    topic: 'Travel',
    pictureUrl: '/images/articles/thai.jpg',
  },
  {
    title: 'The Secret Lives of Cats: A Pawsitive Comedy',
    text: 'Ever wondered what your feline friend is really up to when you’re not around? Here’s a sneak peek into the top-secret world of cats, where things are a lot funnier than you might expect. Cats and laser pointers have a complex relationship. They treat those little red dots like elusive prey, performing Olympic-level acrobatics to catch them. But let’s be honest—cats know that red dot is a lie. They’re just humoring us, making us think we’ve invented a game that’s as riveting as the hunt for an actual mouse. In reality, they’re just plotting their next nap spot. When you order food in Thailand, you might be asked how spicy you want it. You’ll probably respond with “a little” or “medium,” but what you might not realize is that Thai “medium” can range from “mildly tingly” to “instantaneously sweat-inducing volcanic eruption.” If you’re not sure what to choose, just remember: “little” can still pack a punch that will have you gulping down coconut water like it’s your new best friend.',
    topic: 'Animals',
    pictureUrl: '/images/articles/cat.jpg',
  },
  {
    title: 'How Durian does smell like?',
    text: 'Durian’s sales pitch starts with its reputation. It’s famous for its strong smell, which can be described as everything from “overripe onions” to “smelly gym socks” depending on who you ask. This scent is so potent that many public places, like hotels and public transport, have signs banning it. So, if you’re thinking of buying durian, be prepared for some puzzled looks and the occasional “Are you sure you want that?” from friends.',
    topic: 'Food',
    pictureUrl: '/images/articles/durian.jpg',
  },
  {
    title: 'The Unseen Drama of Football Substitutes',
    text: 'Ever wondered what goes on in the minds of those players warming the bench during a football match? You might think it’s a dull experience, but behind the scenes, the substitute bench is a hotbed of drama, intrigue, and unexpected hilarity. Let’s take a look at the secret lives of football substitutes.',
    topic: 'Sport',
    pictureUrl: '/images/articles/football.jpg',
  },
]

export const getRandomArticle = (index = 0) => {
  return articles[index]
}

export type Position = {
  id: string
  title: string
  description: string
  location: string
  skills: string[]
  level: 'entry' | 'middle' | 'senior'
  salary?: number
  salaryType?: 'yearly' | 'monthly' | 'hourly'
  locationType: 'remote' | 'on-site' | 'hybrid'
  type: 'full' | 'part' | 'contract'
}

const positions: Position[] = [
  {
    id: '1',
    title: 'Business Analyst',
    skills: ['Business Process', 'Analytical Skills'],
    location: 'Paris, France',
    locationType: 'remote',
    level: 'middle',
    type: 'full',
    salary: 90000,
    salaryType: 'yearly',
    description: `<h2>About Us:</h2>
<p>At [Company Name], we’re dedicated to driving innovation and delivering exceptional value to our clients. We’re seeking a talented Business Analyst to join our dynamic team and play a key role in shaping our business strategies and processes.</p>
<h2>Position Overview:</h2>
<p>As a Business Analyst, you will work closely with stakeholders to identify business needs, gather requirements, and develop data-driven solutions to enhance operational efficiency. You’ll be responsible for analyzing complex data, creating detailed reports, and providing actionable insights to support decision-making and improve overall performance.</p>
<h2>Key Responsibilities:</h2>
<ul>
<li>Collaborate with stakeholders to understand business requirements and objectives.</li>
<li>Conduct detailed analysis of business processes and systems to identify areas for improvement.</li>
<li>Develop and maintain comprehensive documentation, including business requirements, functional specifications, and process maps.</li>
<li>Analyze data to generate reports and provide insights that drive strategic decision-making.</li>
<li>Design and implement solutions to address identified business needs and enhance operational efficiency.</li>
<li>Facilitate meetings and workshops to gather requirements, present findings, and drive consensus.</li>
<li>Work closely with project managers and development teams to ensure successful delivery of projects.</li>
<li>Monitor project progress and provide regular updates to stakeholders.</li>
</ul>

<h2>Qualifications:</h2>
<ul>
<li>Bachelor’s degree in Business Administration, Computer Science, or a related field.</li>
<li>3+ years of experience as a Business Analyst or in a similar role.</li>
<li>Strong analytical skills with the ability to interpret complex data and generate actionable insights.</li>
<li>Proficiency in data analysis tools and software (e.g., Excel, SQL, Tableau).</li>
<li>Excellent communication and interpersonal skills, with the ability to interact effectively with stakeholders at all levels.</li>
<li>Experience with project management methodologies and tools is a plus.</li>
<li>Detail-oriented with strong organizational and problem-solving abilities.</li>
</ul>

<h2>What We Offer:</h2>
<ul>
<li>Competitive salary and benefits package.</li>
<li>Opportunities for professional growth and development.</li>
<li>A collaborative and supportive work environment.</li>
<li>Flexible working hours and remote work options.</li>
<li>Health, dental, and vision insurance.</li>
</ul>

<h2>How to Apply:</h2>
<p>If you’re passionate about leveraging data to drive business success and are ready to take on a challenging and rewarding role, we’d love to hear from you. Please submit your resume and cover letter to [application email] with the subject line “Business Analyst Application – [Your Name]”.</p>`,
  },
  {
    id: '2',
    title: 'Data Team Lead',
    skills: ['SQL', 'AWS', 'Databases'],
    level: 'senior',
    location: 'London, UK',
    locationType: 'on-site',
    type: 'full',
    description: `
    <h2>About Us:</h2>
    <p>[Your Company Name] is a [brief description of your company – e.g., leading provider of data solutions, innovative tech company, etc.]. We are dedicated to leveraging data to drive strategic decision-making and deliver exceptional value to our clients. We are seeking a skilled and experienced Data Team Lead to oversee our data team and drive impactful data initiatives.</p>
    <h2>Position Overview:</h2>
    <p>The Data Team Lead will be responsible for leading a team of data professionals in managing and analyzing data to support business objectives. This role involves overseeing data projects, ensuring data quality and integrity, and providing strategic insights through data analysis. The ideal candidate will have strong leadership skills, a deep understanding of data management and analytics, and a track record of successfully leading data-driven projects.</p>
    <h2>Qualifications:</h2>
    <ul>
      <li>Bachelor’s degree in Data Science, Computer Science, Statistics, Mathematics, or a related field; Master’s degree is a plus.</li>
 <li>6 years of experience in data analysis, data management, or a related field, with at least [Y] years in a leadership or managerial role. </li>
<li>Proven experience in leading data teams and managing complex data projects.</li>
<li>Strong proficiency in data analysis tools and programming languages (e.g., SQL, Python, R). </li>
<li>Experience with data visualization tools (e.g., Tableau, Power BI) and data management platforms.</li>
<li>Excellent analytical, problem-solving, and communication skills. </li>
<li>Ability to translate complex data into actionable insights and strategic recommendations. </li>
<li>Strong organizational skills with the ability to manage multiple projects and priorities. </li>
    </ul>`,
  },
  {
    id: '3',
    title: 'Email Marketing Specialist / Social Media Manager',
    skills: ['Copywriting', 'Email', 'Social Media', 'Web Content Writing'],
    level: 'middle',
    location: 'San Francisco, USA',
    locationType: 'hybrid',
    type: 'full',
    description: `
     <h2>About Us:</h2>
     <p>[Your Company Name] is a [brief description of your company – e.g., leading digital marketing agency, innovative tech company, etc.]. We are passionate about [company mission or values – e.g., creating compelling content, engaging with our audience, etc.]. We are looking for a creative and strategic Social Media Manager to elevate our online presence and drive engagement across social media platforms.</p>
      <h2>Position Overview:</h2>
      <p>The Social Media Manager will be responsible for developing and executing social media strategies to enhance our brand’s visibility and engagement. This role involves creating and curating content, managing social media accounts, and analyzing performance metrics to optimize our social media efforts. The ideal candidate will have a deep understanding of social media trends, excellent communication skills, and a passion for engaging with audiences.</p>
      <h2>Qualifications:</h2>
      <ul>
      <li>Bachelor’s degree in Marketing, Communications, or a related field.</li>
 <li>4 years of experience in social media management or a related role.</li>
<li>Proven experience in developing and executing successful social media strategies and campaigns.</li>
<li>Proficiency in social media platforms and tools (e.g., Hootsuite, Buffer, Sprout Social).</li>
<li>Strong understanding of social media analytics and metrics (e.g., Google Analytics, platform-specific insights).</li>
<li>Excellent written and verbal communication skills, with the ability to create engaging content.</li>
<li>Creative thinking and problem-solving abilities.</li>
<li>Ability to work independently and manage multiple projects and deadlines.</li>
      </ul>
    `,
  },
  {
    id: '4',
    title: 'Head of Artificial Intelligence',
    skills: ['Artificial Intelligence', 'Deep Learning', 'Machine Learning'],
    level: 'senior',
    location: 'New York, USA',
    locationType: 'on-site',
    type: 'part',
    description: `
     <h2>About Us:</h2>
     <p>[Your Company Name] is a [brief description of your company – e.g., cutting-edge tech company, innovative data solutions provider, etc.]. We are dedicated to leveraging advanced technologies to drive transformative solutions and deliver exceptional value to our clients. We are seeking a visionary and experienced Head of Artificial Intelligence to lead our AI initiatives and shape the future of our AI capabilities.</p>
     <h2>Position Overview:</h2>
     <p>The Head of Artificial Intelligence will be responsible for defining and executing the AI strategy across the organization. This role involves leading a team of AI researchers and engineers, overseeing the development and deployment of AI solutions, and ensuring that our AI initiatives align with business objectives. The ideal candidate will have extensive experience in AI technologies, a proven track record in leading AI projects, and the ability to drive innovation and strategy in a fast-paced environment.</p>
     <h2>Qualifications:</h2>
     <ul>
     <li>Master’s or Ph.D. in Artificial Intelligence, Computer Science, Data Science, or a related field.</li>
 <li>2 years of experience in AI research and development, with a significant portion in a leadership role.</li>
<li>Proven experience in developing and deploying AI solutions at scale, including expertise in machine learning, deep learning, and NLP.</li>
<li>Strong leadership and team management skills, with the ability to inspire and guide a team of AI professionals.</li>
<li>Excellent problem-solving skills and the ability to drive complex AI projects from ideation to implementation.</li>
<li>Familiarity with AI tools and frameworks (e.g., TensorFlow, PyTorch, Scikit-learn).</li>
<li>Strong analytical and strategic thinking skills, with the ability to translate business needs into technical solutions.</li>
<li>Excellent communication skills, with experience presenting technical concepts to executive and non-technical audiences.</li>
</ul>
    `,
  },
  {
    id: '5',
    title: 'Sales Manager',
    skills: ['Sales', 'Client Accounts'],
    level: 'middle',
    location: 'Berlin, Germany',
    locationType: 'hybrid',
    type: 'contract',
    description: `
     <h2>About Us:</h2>
     <p>[Your Company Name] is a [brief description of your company – e.g., leading provider of innovative products/services, dynamic tech firm, etc.]. We are committed to delivering exceptional value and building strong relationships with our clients. We are seeking a results-driven Sales Manager to lead our sales team and drive revenue growth.</p>
     <h2>Position Overview:</h2>
     <p>The Sales Manager will be responsible for leading and managing the sales team to achieve sales targets and drive business growth. This role involves developing sales strategies, overseeing sales activities, and building strong relationships with clients and partners. The ideal candidate will have a proven track record in sales management, excellent leadership skills, and a strategic mindset.</p>
     <h2>Qualifications:</h2>
     <ul>
     <li>Bachelor’s degree in Business Administration, Marketing, or a related field; Master’s degree is a plus.</li>
 <li>3 years of experience in sales, with at least [Y] years in a managerial or leadership role. </li>
<li>Proven track record of achieving sales targets and driving revenue growth. </li>
<li>Strong leadership and team management skills, with the ability to motivate and guide a sales team. </li>
<li>Excellent communication and interpersonal skills, with the ability to build and maintain relationships with clients and stakeholders. </li>
<li>Strong analytical and problem-solving skills, with experience in sales forecasting and reporting. </li>
<li>Proficiency in sales software and CRM systems (e.g., Salesforce, HubSpot). </li>
<li>Ability to work independently and handle multiple priorities in a fast-paced environment.</li>
     </ul>
    `,
  },
  {
    id: '6',
    title: 'Marketing Manager',
    skills: ['Business Process', 'Analytical Skills'],
    level: 'middle',
    location: 'Lisbon, Portugal',
    locationType: 'remote',
    type: 'full',
    description: `
    <h2>About Us:</h2>
    <p>[Your Company Name] is a [brief description of your company – e.g., innovative technology firm, dynamic consumer goods company, etc.]. We are committed to [company mission or values – e.g., delivering cutting-edge solutions, fostering a creative work environment, etc.]. We are looking for a talented and strategic Marketing Manager to join our team and help drive our brand's growth and engagement.</p>
    <h2>Position Overview:</h2> 
    <p>The Marketing Manager will be responsible for developing and executing marketing strategies that align with our business goals. This role involves creating and managing marketing campaigns, analyzing market trends, and ensuring that our brand message is effectively communicated across all channels. The ideal candidate will have a proven track record in marketing, strong leadership skills, and the ability to think creatively and strategically.</p>
    <h2>Qualifications:</h2>
    <ul>
    <li>Bachelor’s degree in Marketing, Business Administration, or a related field; Master’s degree is a plus.</li>
 <li>5 years of experience in marketing, with a strong background in managing campaigns and leading teams.</li>
<li>Proven ability to develop and execute marketing strategies that drive business results.</li>
<li>Excellent communication, leadership, and project management skills.</li>
<li>Proficiency in marketing software and tools (e.g., Google Analytics, CRM systems, social media platforms).</li>
<li>Strong analytical skills with the ability to interpret data and make data-driven decisions.</li>
<li>Creative thinking and problem-solving abilities.</li>
</ul>
    `,
  },
  {
    id: '7',
    title: 'Social Media Manager',
    skills: ['Copywriting', 'Email', 'Social Media', 'Web Content Writing'],
    level: 'entry',
    location: 'Lisbon, Portugal',
    locationType: 'on-site',
    type: 'full',
    description: `
     <h2>About Us:</h2>
     <p>[Your Company Name] is a [brief description of your company – e.g., leading digital marketing agency, innovative tech company, etc.]. We are passionate about [company mission or values – e.g., creating compelling content, engaging with our audience, etc.]. We are looking for a creative and strategic Social Media Manager to elevate our online presence and drive engagement across social media platforms.</p>
      <h2>Position Overview:</h2>
      <p>The Social Media Manager will be responsible for developing and executing social media strategies to enhance our brand’s visibility and engagement. This role involves creating and curating content, managing social media accounts, and analyzing performance metrics to optimize our social media efforts. The ideal candidate will have a deep understanding of social media trends, excellent communication skills, and a passion for engaging with audiences.</p>
      <h2>Qualifications:</h2>
      <ul>
      <li>Bachelor’s degree in Marketing, Communications, or a related field.</li>
 <li>4 years of experience in social media management or a related role.</li>
<li>Proven experience in developing and executing successful social media strategies and campaigns.</li>
<li>Proficiency in social media platforms and tools (e.g., Hootsuite, Buffer, Sprout Social).</li>
<li>Strong understanding of social media analytics and metrics (e.g., Google Analytics, platform-specific insights).</li>
<li>Excellent written and verbal communication skills, with the ability to create engaging content.</li>
<li>Creative thinking and problem-solving abilities.</li>
<li>Ability to work independently and manage multiple projects and deadlines.</li>
      </ul>
    `,
  },
]

export const getRandomPosition = (index = 0) => {
  return positions[index]
}
