<script>
import { mapState } from 'vuex';
export default {
  name: 'IndexPage',
  data() {
    return {
      userData: []
    }
  },
  async fetch() {
    this.findMany();
  },
  computed: {
    ...mapState("user-info", ["info"]),
    ...mapState("user-field", ["fields"]),

  },
  methods: {
    async findMany() {
      try {
        const res = await this.$store.dispatch("user-info/getInfo")
        // console.log(res)
        // res.data.forEach(r => this.userData[r.userFieldId] = r.value)   
        if (res.status == 200) {
          const mapped = res.data.map((r) => this.userData[r.userFieldId] = r.value);
          console.log(mapped)
          this.findFields();
        }
      } catch (err) {
        console.log(err.response)
      }
    },
    async findFields() {
      try {
        const res = await this.$store.dispatch("user-field/getFields")
      } catch (err) {
        console.log(err.response)
      }
    },
    async createInfo() {
      try {
        const res = await this.$store.dispatch("user-info/createInfo", { userInfo: this.userData, userId: 1 })
        if (res.status === 201) {
          this.$toast.success("Saved!");
        }
        // console.log(res)
      } catch (err) {
        console.log(err.response)
      }
    }
  }
}
</script>
    
  
<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4" v-for="field in fields" :key="field.id">
                <v-text-field :label="field.fldname" outlined v-model="userData[field.id]"></v-text-field>
                <!-- {{ userData[field.id] }} -->
              </v-col>
            </v-row>
            <v-btn color="primary" @click="createInfo()">
              SAVE
            </v-btn>
          </v-container>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>