
const FileUpload = () => {

  return (
    <div>
        <form encType='multipart/form-data' onSubmit={handleOnSubmit}>
            <input type="file" name="photo" id="photo_share" multiple />
        </form>
    </div>
  )
}

export default FileUpload;