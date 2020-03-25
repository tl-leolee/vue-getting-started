<template>        
    <main class="faq">          
        <h1>Frenquently Asked Questions</h1>    

        <Loading v-if="remoteDataBusy" />

        <div class="error" v-if="hasRemoteErrors">
            Can't load the question
        </div>

        <section class="list">
            <article v-for="question in questionList" :key="question._id">
                <h2 v-html="question.title"></h2>
                <p v-html="question.content"></p>
            </article>
        </section>

    </main>      
</template>

<script>
import RemoteData from '../mixins/RemoteData'
export default {
    mixins: [
        RemoteData({
            questionList: 'questions'
        })
    ],
    data() {
        return {
            error: null,
            loading: false,
        }
    }
}
</script>