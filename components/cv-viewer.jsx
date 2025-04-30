import API from "@/config/config";

const CVViewer = ({ candidate }) => {
    const fileUrl = candidate?.cvFileUrl
    ? `${API.defaults.baseURL}/${candidate.cvFileUrl.replace(/\\/g, '/').replace('public/', '')}`
    : null;

    return (
      <div className="w-1/2 border-r overflow-auto">
        {fileUrl ? (
          <iframe
            src={fileUrl}
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="PDF Viewer"
          ></iframe>
        ) : (
          <p className="p-4 text-gray-500">
            {candidate?.cvFileUrl ? "Document not available" : "No CV uploaded"}
          </p>
        )}
      </div>
    )
  }

  export default CVViewer