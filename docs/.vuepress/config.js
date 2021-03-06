module.exports = {
  title: 'Particula Project Documentation',
  description: 'Particula Project Documentation',
  themeConfig: {
    nav: [
      {text: 'Redmine', link: 'https://project.devbit.be/projects/particula'},
      {text: 'Organization', link: 'https://github.com/vives-projectwerk-2-2020'}
    ],
    sidebar: [
      '/',
      ['/docker/', 'Docker'],
      ['/frontend/', 'Frontend'],
      ['/backend/', 'Backend'],
      ['/firmware/', 'Firmware'],
      ['/ttn/', 'The Things Network'],
      ['/hardware/', 'Hardware'],
      ['/presentations/', 'Presentations']
    ],
    sidebarDepth: 1,
    repo: 'vives-projectwerk-2-2020/particula.devbitapp.be',
    docsDir: 'docs',
    docsBranch: 'master'
  },
  markdown: {
    lineNumbers: true,
  },
  serviceWorker: true,
  plugins: [],
}