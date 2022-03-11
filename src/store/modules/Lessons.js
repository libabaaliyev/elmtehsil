import Axios from 'axios';
import slug from 'slugify';
import { router } from '../../main';

export default {
    state: {
        lessons: [],
        page: 1,
        count: 0
    },
    getters:{

    },
    mutations:{

    },
    actions:{
        getLessons({commit},data)
        {
            let Lessons = this.state.Lessons; 
            if(data){
                Lessons.page = data.page;
            }
            this.state.Start.loader = true;
            if(navigator.onLine){
                let base = new FormData();
                base.append("info","get-lessons");
                base.append("page",Lessons.page);
                this.state.Start.loader = true;
                Axios.post("/api/elmtehsil/data.php",base).then(response=>
                {
                    const data        = response.data;
                    Lessons.lessons   = data.lessons;
                    Lessons.count     = data.count;
                    this.state.Start.loader = false;
                });
            }
            else{

            }
        },
        getLesson({commit},data){
            const seo = data.seo;
            this.state.Start.loader = true;
            if(navigator.onLine){
                let base = new FormData();
                base.append("info","get-lesson");
                base.append("seo",seo);
                Axios.post("/api/elmtehsil/data.php",base).then(response=>
                {
                    const data        = response.data;
                    Lessons.lessons   = data.lesson;
                this.state.Start.pagLimit = data.limit;

                    this.state.Start.loader = false;
                });
            }
            else{

            }
        }
    }
}