import Docker from "dockerode";

// Initialize Dockerode instance with default options (handles //./pipe/docker_engine on Windows and /var/run/docker.sock on Unix)
const docker = new Docker();

export default docker;
export { docker };
