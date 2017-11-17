<template lang="html">
  <div class="col-md-8 col-md-offset-2">
    <div class="tablecontrainer">
      <table class="table table">
          <thead>
            <tr>
              <th>
                <center>
                First Name
                </center>
              </th>
              <th>
                <center>
                Last Name
                </center>
              </th>
              <th>
                <center>
                Email-Address
                </center>
              </th>
              <th>
                <center>
                </center>
              </th>
            </tr>
          </thead>
          <user-data :users="users" :removeAccount="removeAccount"></user-data>
        </table>
    </div>
  </div>
</template>

<script>
import userData from '@/components/userData'

export default {
  props: ['users', 'removeAccount'],
  components: {
    userData
  }
}
</script>

<style lang="css">
.tablecontrainer {
  margin-top: 5%;
}
</style>
