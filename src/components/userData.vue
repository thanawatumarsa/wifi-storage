<template lang="html">
  <tbody>
      <tr v-for="(user, index) in users">
        <td>
          {{user.fname}}
        </td>
        <td>
          {{user.lname}}
        </td>
        <td>
          {{user.email}}
        </td>
        <td>
          <span @click="remove(user, index, user.email, user.pass)" class="glyphicon glyphicon-trash" aria-hidden="true" data-toggle="modal" data-target="#basicModal3" style="cursor:pointer"></span>
        </td>
        <div class="modal fade" id="basicModal3" tabindex="-1" role="dialog" aria-labelledby="basicModal3" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content" style="overflow:hidden">
              <div class="modal-header" style="background-color:#CC0000; color:white">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">Remove User</h4>
              </div>
              <div class="modal-header">
                <h3>Are you sure to remove this User?</h3>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancle</button>
                <button  @click="removeAccount(removeindex, removeuser, removeemail, removepass)" type="button" class="btn btn-primary" data-dismiss="modal">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </tr>
  </tbody>
</template>

<script>
export default {
  props: ['users', 'removeAccount'],
  data () {
    return {
      removeindex: '',
      removeemail: '',
      removepass: '',
      removeuser: ''
    }
  },
  methods: {
    remove: function (user, index, email, pass) {
      this.removeindex = index
      this.removeemail = email
      this.removepass = pass
      this.removeuser = user
    }
  }
}
</script>

<style lang="css">

</style>
