import Axios from 'axios';
import slug from 'slugify';
import { router } from '../../main';

export default {
    state: {
        article: {},
        loader: true,
        articles: JSON.parse(localStorage.getItem("articles")),
        news: [],
        likeNews: [],
        popular: JSON.parse(localStorage.getItem("popular")),
        categories: [],
        categoryNews: [],
        team: [],
        paginPost: JSON.parse(localStorage.getItem("pagePost")),
        count: 0,
        articleCount: 0,
        hit: 0,
        pagination: 1,
        months: [
            "Yanvar",
            "Fevral",
            "Mart",
            "Aprel",
            "May",
            "İyun",
            "İyul",
            "Avqust",
            "Sentyabr",
            "Oktyabr",
            "Noyabr",
            "Dekabr"
        ],
        likeText:{
            like: "Bəyən",
            unlike: "Bəyənmə"
        },
        likeArticles: JSON.parse(localStorage.getItem("likeArticles"))
    },
    getters:{
        seo: (state)=>(text)=>{
            return slug(text.toLowerCase());
        },
        controlSeo: (state) => (seo,base)=>{
            for (let index = 0; index < base.length; index++) {
                const element = base[index];
                if(element.seo == seo){
                    return index;
                    break;
                }
                else{
                    if(index == (base.length - 1)){
                        return false;
                    }
                }
                
            }
        },
        editTime: (state)=>(time)=>{
            const d        = new Date(time);
            const day      = d.getDate();
            const month    = d.getMonth();
            const year     = d.getFullYear();
            const hour     = d.getHours();
            const min      = d.getMinutes();
            let fullTime;
            if(hour && min){
                if(min < 10){
                    fullTime = ' ' + hour + ':0'+ min
                }
                else{
                    fullTime = ' ' + hour + ':'+ min
                }
            }
            else{
                fullTime = '';
            }

            return day + ' ' + state.months[month] + '' + fullTime +  ', ' + year;
        },
        getLike: (state)=>(seo,act)=>{
            
            if(localStorage.getItem("likeArticles") ===  null){
                if(act=='text'){
                    return state.likeText.like;
                }
                else if(act == 'control'){
                    return 'none';
                }
            }
            else{
                state.likeNews = JSON.parse(localStorage.getItem("likeArticles"));
                
                if(state.likeNews.length > 0){                
                    for (let index = 0; index < state.likeNews.length; index++) {
                        const element = state.likeNews[index]['seo'];
                        if(element == seo){
                            if(act == 'text'){                                
                                return state.likeText.unlike;
                                break;
                            }
                            else if(act == 'control'){
                                return index;
                                break;
                            }
                        }
                        else{
                            if(index == (state.likeNews.length - 1)){
                                if(act=='text'){
                                    return state.likeText.like;
                                    break;
                                }
                                else if(act == 'control'){
                                    return 'none';
                                    break;
                                }
                            }
                        }

                    }
                }
                else{
                    if(act=='text'){
                        return state.likeText.like;
                    }
                    else if(act == 'control'){
                        return 'none';
                    }
                }
            }
        },
        controlTeam: (state)=>(username)=>{
            state.team = JSON.parse(localStorage.getItem("team"));
            for (let index = 0; index < state.team.length; index++) {
                const element = state.team[index];

                if(element.username == username){
                    return index;
                }
                else{
                    if(index == (state.team.length - 1)){
                        return -1;
                    }
                }
            }
        },
        controlCategory: (state)=>(category)=>{
            if(localStorage.getItem("categories") === null){
                return -1;
            }
            else{
                state.categories = JSON.parse(localStorage.getItem("categories"));
                for (let index = 0; index < state.categories.length; index++) {
                    const element = state.categories[index];
                    if(element.seo == category){
                        return index;
                    }
                    else{
                        if(index == (state.categories.length - 1)){
                            return -1;
                        }
                    }
                    
                }
            }
        },
        controlID: (state)=>(id,base)=>{
            if(base.length > 0){
                for (let index = 0; index < base.length; index++) {
                    const element = base[index];
                    if(element.id == id){
                        return index;
                    }
                    else{
                        if(index == (base.length - 1)){
                            return -1;
                        }
                    }
                    
                }
            }
            else{
                return -1;
            }
        },
        getCookie: (state) => (tag)=>{
            
            let decodedCookie   = decodeURIComponent(document.cookie);
            
            let cookieSplit     = ((decodedCookie).replace(' ','')).split(';');
            for(let i = 0; i < cookieSplit.length; i++) {
                let splt = cookieSplit[i];                
                if(splt.indexOf(tag) == 0){
                    return true;
                }
                else{
                    if(i == (cookieSplit.length - 1)){
                        return false;
                    }
                }
            }
            
        }
    },
    mutations:{
        importPagePag(state,data){
            const pag               = data.pagination;
            const posts             = data.posts;
            let pagObj            = {};
            if(localStorage.getItem("pagePost")){                
                pagObj                  = JSON.parse(localStorage.getItem("pagePost"));
                pagObj['pag-' + pag]    = posts;
            }
        },
        likeArticle(state,article){
            if(localStorage.getItem("likeArticles") ===  null){
                state.likeNews = [];
                state.likeNews.push(article);
                localStorage.setItem("likeArticles",JSON.stringify(state.likeNews));
                this.getters.getLike(article.seo,'text');
            }
            else{
                let control = this.getters.getLike(article.seo,'control');
                state.likeNews = JSON.parse(localStorage.getItem("likeArticles"));
                if(control == 'none'){
                    state.likeNews.push(article);
                    localStorage.setItem("likeArticles",JSON.stringify(state.likeNews));
                    
                }
                else{
                    state.likeNews.splice(control,1);
                    localStorage.setItem("likeArticles",JSON.stringify(state.likeNews));                   
                }
            }
            
        },
        setCookie(state,data){
            const d     = new Date();
            const day   = data.day;
            const seo   = data.seo;

            d.setTime(d.getTime() + (day*24*60*60*1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = seo+";" + expires;
        },
        getArticle(state,db){
            let data            = db.data;
            let control         = db.control;
            let Start           = this.state.Start;
            state.article       = data.meqale;
            state.categoryNews  = data.bolmemeqale;
            Start.title         = state.article.name;
            Start.description   = ((state.article.text).replace(/<[^>]*>?/gm, '')).substr(0,120);
            Start.image         = Start.imageRoot + state.article.image;
            if(localStorage.getItem("articles") === null){
                state.articles = [];
            }
            if(data.meqale){
                if(control === false){
                    state.articles.push(data.meqale);
                }
                else{
                    state.articles.control = data.meqale;
                }
            }
            else{
                router.push({name: "notfound"});
            }
            localStorage.setItem("articles",JSON.stringify(state.articles));
            Start.loader         = false;
        }
    },
    actions:{
        getPage({commit},data){
            let News            = this.state.News;
            let Start           = this.state.Start;
            News.pagination     = data.page;
            const action        = data.action;
            const tag           = data.tag;
            const category      = data.category;
            News.loader         = true;
            News.news           = [];
            let db              = new FormData();
            db.append('pagination',data.page);
            db.append('last',News.count);            
            db.append('info', 'get-page');
            db.append('action', action);
            db.append('tag', tag);
            db.append('category',category);            
            Axios.post("/api/elmtehsil/data.php",db)
            .then(response=>
            {
                const data                  = response.data;
                News.news                   = data.meqale;
                News.count                  = data.meqale_say;
                this.state.Start.pagLimit   = data.limit;
                if(tag == 'get-any'){
                    commit("importPagePag",{pagination: data.page,posts: data.meqale});
                }
                News.loader  = false;
            })
            .catch(err => {
                const msg = err.message;
                if(msg == 'Network Error'){
                    if(News.paginPost){
                        News.news = News.paginPost['pag-'+data.page];
                    }
                    commit("notification","internet-error")
                }
                else{
                    commit("notification","errorSomething")
                }
                News.loader  = false;
            })
        
        },
        getArticle({commit},data){
            const seo       = data.seo;
            const category  = data.category;
            let News        = this.state.News; 
            let Start       = this.state.Start;
            let base        = new FormData();
            let control     = false;
            let hitAllow    = this.getters.getCookie(seo);
            
            if(News.articles){
                if(News.articles.length > 0){
                    control = this.getters.controlSeo(seo,News.articles);
                }
            }
            base.append('seo',seo);
            base.append('category',category);
            base.append('info', 'get-article');
            base.append('hit',hitAllow);
            News.loader    = true;
            Start.title     = '';
                Axios.post("/api/elmtehsil/data.php",base)
                .then(response=>
                    {
                        const data = response.data;
                        commit("getArticle",{data,control});
                        if(!hitAllow){
                            commit("setCookie",{day: 1,seo});
                        }
                        News.loader = false;
                    })
                .catch(err => {
                    News.loader = true;
                    
                    if(err.message == 'Network Error'){
                        if(control){
                            News.article            = News.articles[control];
                            Start.title             = News.article.name;
                            window.document.title   = News.article.name;
                            News.loader             = false;
                        }
                        else{
                            Start.title             = 'Ups';
                            commit("notification","internet-error");
                        }
                    }
                    else{
                        Start.title             = 'Ups';
                        commit("notification","errorSomething");
                    }
                })
        },
        getArticleID({commit,dispatch},data){
            let News        = this.state.News;
            let Start       = this.state.Start;
            const seo       = data.seo;
            let db          = new FormData();
            const dataBase  = JSON.parse(localStorage.getItem("articles"));
            let control     = this.getters.controlSeo(seo,dataBase);
            let hitAllow    = this.getters.getCookie(seo);
            News.loader     = true;
            Start.title     = '';
            
            if(control === false){                
                db.append('seo',seo);
                db.append('info', 'get-article-id');
                db.append('hit',hitAllow);
                News.loader = true;
                Axios.post("/api/elmtehsil/data.php",db)
                .then(response=>{
                    const data = response.data;
                    if(data.meqale){
                        commit("getArticle",{data,control});
                        if(!hitAllow){
                            commit("setCookie",{day: 1,seo});
                        }
                    }
                    else{
                        router.push({name: 'notfound'});
                    }
                    News.loader = false;
                })
                .catch(err => {
                    const msg = err.message;
                    if(msg == 'Network Error'){
                        Start.title             = 'Ups';
                        commit("notification","internet-error");
                    }
                    else{
                        commit("notification","errorSomething");
                    }
                });
            }
            else{
                
                const category  = dataBase[control]['category'];
                const seo       = dataBase[control]['seo'];
                dispatch("getArticle",{category,seo});
                router.push('/' + category + '/' + seo);
                //location.reload();
            }
        },
        getCategory({commit},data){
            let News        = this.state.News; 
            let Start       = this.state.Start; 
            let db          = new FormData();
            News.pagination = 1;
            News.loader     = true;
            News.news       = [];
            db.append('category',data.category);
            db.append('info', 'get-category');
            db.append('action',data.action);

            if(data.action == 'category'){
                commit("metaCreate");
                const id     = this.getters.controlCategory(data.category);
                let name     = News.categories[id]['name'];
                Start.title  = name;
            }
            else if(data.action == 'author'){
                const id            = this.getters.controlTeam(data.category);
                let name            = News.team[id]['name'];
                let description     = News.team[id]['about'];
                let image           = News.team[id]['image'];
                
                Start.title         = name;
                Start.description   = description;
                Start.image         = Start.imageRoot + image;
            }
            
            Axios.post("/api/elmtehsil/data.php",db)
            .then(response=>
            {
                const data          = response.data;
                News.news           = data.meqale;
                News.articleCount   = data.meqale_say;
                News.hit            = data.hit['hit'];
                Start.pagLimit      = data.limit;
                News.loader         = false;
            })
            .catch(err => {
                News.loader    = true;
                const msg = err.message;
                if(msg == 'Network Error'){
                    commit("notification",'internet-error');
                }
                else{
                    commit("notification",'errorSomething');
                }
            })
        }
    }
}