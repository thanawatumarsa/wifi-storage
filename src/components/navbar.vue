<template lang="html">
  <div class="no-print">
    <nav class="navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <div class="navbar-brand" href="#">
            <img alt="" src="../assets/hellopine logo.png" width="30%" style="">
          </div>
        </div>
        <ul class="nav navbar-nav navbar-right">
          <li v-if= "chkAdmin === true && chkDashboard === false"><a @click="mgmtAdmin()" style="cursor:pointer">Admin</a></li>
          <li v-else-if="chkAdmin === true" style="cursor:pointer"><a @click="goDashboard()">Project lists</a></li>
          <!-- <li><a @click="test" href="#">Test</a></li> -->
          <li v-if="chkLog === true"><a style="cursor:pointer" data-toggle="modal" data-target="#signout">Sign out</a></li>
        </ul>
      </div>
    </nav>
    <div class="modal fade" id="signout" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content" style="overflow:hidden">
        <div class="modal-header" style="background-color:#CC0000; color:white">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalLabel">Sign out</h4>
        </div>
        <div class="modal-body">
          <h3>Are you want to Sign out?</h3>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button @click="signout()" type="button" class="btn btn-primary" data-dismiss="modal">Sign out</button>
        </div>
      </div>
    </div>
  </div>
  </div>

</template>

<script>
export default {
  props: ['test', 'signout', 'chkAdmin', 'chkLog'],
  data () {
    return {
      chkDashboard: false
    }
  },
  methods: {
    mgmtAdmin: function () {
      var vm = this
      this.chkDashboard = true
      vm.$router.push('/admin')
    },
    goDashboard: function () {
      var vm = this
      this.chkDashboard = false
      vm.$router.push('/dashboard')
    }
  }
}
</script>

<style lang="css">
  .navbar {
    background-color: white;
  }
</style>
