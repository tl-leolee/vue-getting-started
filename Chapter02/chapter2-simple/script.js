Vue.filter('date', time => moment(time).format('DD/MM/YY, HH:mm'))

// New VueJS instance
new Vue({
  name: 'notebook',

  // CSS selector of the root DOM element
  el: '#notebook',

  // Some data
  data () {
    return {
      notes: JSON.parse(localStorage.getItem('notes')) || [],
      selectedId: localStorage.getItem('selected-id') || null,
    }
  },

  // Computed properties
  computed: {
    notePreview() {
      // Markdown rendered to HTML
      return this.selectedNote ? marked(this.selectedNote.content) : ''
    },
    addButtonTitle() {
      return `${this.notes.length || 0} note(s) already`
    },
    selectedNote() {
      return this.notes.find(note => note.id === this.selectedId)
    },
    sortedNotes() {
      return this.notes.slice()
        .sort((a,b) => a.created - b.created)
        .sort((a,b) => (a.favorite == b.favorite) ? 0
          : a.favorite ? -1
          : 1)
    },
    linesCount() {
      if (this.selectedNote) {
        return this.selectedNote.content.split(/\r\n|\r|\n/).length
      }
    },
    wordCount() {
      var s = this.selectedNote.content
      s.replace(/\n/g, ' ')
      s = s.replace(/(^\s*)|(\s*$)/gi, '')                     
      s = s.replace(/\s\s+/gi, ' ')            
      return s.split(' ').length
    },
    charactersCount () {          
      if (this.selectedNote) {            
        return this.selectedNote.content.split('').length          
      }        
    },
  },

  // Change watchers
  watch: {
    notes: {
      handler: "saveNotes",
      deep: true,
    },
    selectedId: {
      handler(val) {
        localStorage.setItem('selected-id', val)
      }
    }
  },
  methods: {
    reportOperation(opName) {
      console.log(`The ${opName} operation was completed.`)
    },
    addNote() {
      const time = Date.now()
      const note = {
        id: String(time),
        title: `New Note ${this.notes.length + 1}`,
        content: `**Hi!** This notebook is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet ) for formatting!`,
        created: time,
        favorite: false,
      }
      this.notes.push(note)
    },
    selectNote(note) {
      this.selectedId = note.id
    },
    saveNotes() {
      localStorage.setItem('notes', JSON.stringify(this.notes))
      console.log('Notes saved!', new Date())
    },
    removeNote() {
      if (this.selectedId && confirm('Delete the note?')) {
        this.notes = this.notes.filter(note => note.id != this.selectedId)
      }
    },
    favoriteNote() {
      this.selectedNote.favorite ^= true
    }
  },

  // created () {
  //   this.content = localStorage.getItem('content') || 'You can write in **markdown**'
  // },
})
