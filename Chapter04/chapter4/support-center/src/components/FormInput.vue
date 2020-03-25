<template>
  <div class="row">
    <component
      :is="element"
      class="input"
      :class="inputClass"
      :name="name"
      :type="type"
      :value="text"
      :placeholder="placeholder"
      @input="update"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    },
    type: {
      type: String,
      default: "text"
    },
    text: {
      required: true
    },
    placeholder: {
      type: String
    },
    invalid: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    inputClass() {
      return {
        invalid: this.invalid
      };
    },
    element() {
      return this.type == "textarea" ? this.type : "input";
    }
  },
  methods: {
    update(e) {
      this.$emit("update", e.currentTarget.value);
    }
  },
  model: {
    prop: "text",
    event: "update"
  }
};
</script>
