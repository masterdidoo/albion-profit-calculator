<template>
  <section class="container">
    <Header />
    <Table />
  </section>
</template>

<script>
import Header from "~/components/Header";
import Table from "~/components/transportations/Table";

export default {
  name: "Transportations",
  components: {
    Header,
    Table
  },
  middleware: ["authenticated", "supporter"],
  data() {
    return {};
  },
  created: async function () {
    await this.$store.dispatch("transportations/FETCH_STATE");
  },
};
</script>

<style lang='scss'>

</style>