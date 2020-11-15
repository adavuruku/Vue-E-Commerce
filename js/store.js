const store = new Vuex.Store({
    state: {
      lessonList: [],
      showcat:false,
      field:'Subject',
      sorttype:'Asc',
      message:'Hello Aptech'
    },
    getters: {
      getShowCat: state => state.showcat,
      getField: state => state.field,
      getSortType: state => state.sorttype,
      getLessonList: state =>  state.lessonList,
      sayMessage: state => state.message,
    },
    mutations: {
        changeMessage (state, msg){
            state.message = msg 
        },
        changeLessonList(state, lessonData){
            state.lessonList = lessonData
        },
        changeShowCat(state){
            state.showcat = true
        }
    },
    actions:{
      execMessage(context, mjk){
        context.commit('changeMessage', mjk)
      }
    }
  })