import Axios from 'axios';
import slug from 'slugify';
import { router } from '../../main';

export default {
    state: {
        books: [],
        likes: [],
        library: [],
        book: {},
        page: 1,
        count: 0
    },
    getters:{
        controlLibrary: (state)=>(category)=>{
            if(localStorage.getItem("library") === null){
                return -1;
            }
            else{
                state.library = JSON.parse(localStorage.getItem("library"));
                for (let index = 0; index < state.library.length; index++) {
                    const element = state.library[index];

                    if(element.seo == category){
                        return index;
                    }
                    else{
                        if(index == (state.library.length - 1)){
                            return -1;
                        }
                    }
                }
            }
        }
    },
    mutations:{

    },
    actions:{
        getBooks({commit},data)
        {
            let Library = this.state.Library;
            let Start   = this.state.Start;
            const category = data.category;
            if(data.page){
                Library.page = data.page;
            }
            Start.loader    = true;
            Start.pagLimit  = 10;
            if(navigator.onLine){
                let base = new FormData();
                base.append("info","get-books");
                base.append("category",category);
                base.append("page",Library.page);
                Axios.post("/api/elmtehsil/data.php",base).then(response=>
                {
                    const data        = response.data;
                    Library.books     = data.books;
                    Library.count     = data.count;
                    Start.pagLimit    = data.limit;
                    Start.loader = false;
                });
            }
            else{
                //internet olmuyanda
            }
        },
        getBook({commit},seo){
            let Library = this.state.Library;
            let Start   = this.state.Start;
            if(navigator.onLine){
                let base = new FormData();
                base.append("info","get-book");
                base.append("seo",seo);
                Axios.post("/api/elmtehsil/data.php",base).then(response=>
                {
                    const data       = response.data;
                    
                    if(data.book){
                        Library.book     = data.book;
                    }
                    else{
                        router.push({name: "redirect"});
                    }

                    Start.loader = false;
                });
            }
            else{
                //internet olmuyanda
            }
        }
    }
}