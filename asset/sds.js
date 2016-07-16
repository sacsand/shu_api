<div class="col-lg-4"> </div>
<div class="col-lg-4">
  <form method="post" enctype="multipart/form-data" action="/api/wanted/file-upload">

    name
    <input type="text" name="name"/>
    <br/>
    warent
    <input type="text" name="warent"/>
    <br />
    last seen location
    <input type="text" name="lastseenlocation"/>
    <br/>
    description
    <textarea rows="4" cols="50" name="description">
    </textarea>
    <br/>
    sex
    <input type="text" name="sex"/>
    <br/>
    race
    <input type="text" name="race"/>
    <br/>
    height
    <input type="number" name="height"/>
    <br/>
    weight
    <input type="number" name="weight"/>
    <br/>
    hair color
    <input type="text" name="hairColor"/>
    <br/>
    eye color
    <input type="text" name="eyeColor"/>
    <br/>
    wanted person image
    <input type="file" name="photo"/>
    <br/>

    <input type="submit" name="submit" value="submit">
</form>
</div>
<div class="col-lg-4">  </div>
