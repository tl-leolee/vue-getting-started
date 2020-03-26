<script>
import { createNamespacedHelpers } from "vuex";
import NoContent from "./NoContent.vue";
import CreatePost from "./CreatePost.vue";
import PostContent from "./PostContent.vue";
import LocationInfo from "./LocationInfo.vue";

const {
  mapGetters: postsGetters,
  mapActions: postsActions
} = createNamespacedHelpers("posts");
export default {
  computed: {
    ...postsGetters(["draft", "currentPost"]),
    cssClass() {
      return [
        "blog-content",
        {
          "has-content": this.currentPost
        }
      ];
    }
  },
  render(h) {
    let Content;
    if (!this.currentPost) {
      Content = NoContent;
    } else if (this.draft) {
      Content = CreatePost;
    } else {
      Content = PostContent;
    } 
    return (
      <div class={this.cssClass}>
        <LocationInfo />
        <Content />
      </div>
    );
  }
};
</script>
