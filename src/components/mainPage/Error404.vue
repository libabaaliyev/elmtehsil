<template>
    <div>
        <Header/>
        <div class="container mt-5">
            <div class="row">
                <div class="col-6 mx-auto">
                    <img src="/src/img/notresult.webp" class="img-fluid">
                </div>
            </div>
        </div>            
        <Footer class="fixed-bottom"/>
    </div>
</template>
<script>
import Header from '../pageParts/Header';
import Footer from '../pageParts/Footer';
export default {
    components:{
        Header,
        Footer
    }
}
</script>