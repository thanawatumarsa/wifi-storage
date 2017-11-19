<template lang="html">
  <div class="col-md-8 col-md-offset-2 adminContent">
    <h3>User Managment</h3><hr><br>
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
</template>

<script>
import userData from '@/components/userData'

export default {
  props: ['users', 'removeAccount', 'chkLogin'],
  components: {
    userData
  }
}
</script>

<style lang="css">

.adminContent {
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  transition: 0.3s;
  margin-top: 5%;
  float: center;
  background-color: white;
}
</style>
