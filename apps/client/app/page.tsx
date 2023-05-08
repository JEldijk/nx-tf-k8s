export default async function Index() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="wrapper mx-auto p-6">
        <div className="container">
          <div id="welcome">
            <h1 className="text-4xl font-bold mb-6">
              <span className="text-green-600">Hello there, </span>
              Welcome client 👋
            </h1>
          </div>

          <div
            id="hero"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 rounded-lg text-white mb-6"
          >
            <div className="text-container">
              <h2 className="text-3xl font-semibold mb-2">
                <span>You&apos;re up and running</span>
              </h2>
              <a href="#commands" className="text-lg font-semibold underline">
                What&apos;s next?
              </a>
            </div>
          </div>

          <div
            id="middle-content"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <div
              id="learning-materials"
              className="bg-white p-6 rounded-lg shadow"
            >
              <h2 className="text-2xl font-bold mb-6">Learning materials</h2>
              <a
                href="https://nx.dev/getting-started/intro?utm_source=nx-project"
                target="_blank"
                rel="noreferrer"
                className="list-item-link block mb-4"
              >
                <span className="text-xl font-semibold">
                  Documentation
                  <span className="text-gray-500 ml-2">
                    Everything is in there
                  </span>
                </span>
              </a>
              <a
                href="https://blog.nrwl.io/?utm_source=nx-project"
                target="_blank"
                rel="noreferrer"
                className="list-item-link block mb-4"
              >
                <span className="text-xl font-semibold">
                  Blog
                  <span className="text-gray-500 ml-2">
                    Changelog, features & events
                  </span>
                </span>
              </a>
              <a
                href="https://www.youtube.com/@NxDevtools/videos?utm_source=nx-project&sub_confirmation=1"
                target="_blank"
                rel="noreferrer"
                className="list-item-link block mb-4"
              ></a>
              <a
                href="https://nx.dev/react-tutorial/1-code-generation?utm_source=nx-project"
                target="_blank"
                rel="noreferrer"
                className="list-item-link block mb-4"
              >
                <span className="text-xl font-semibold">
                  Interactive tutorials
                  <span className="text-gray-500 ml-2">
                    Create an app, step-by-step
                  </span>
                </span>
              </a>
              <a
                href="https://nxplaybook.com/?utm_source=nx-project"
                target="_blank"
                rel="noreferrer"
                className="list-item-link block mb-4"
              >
                <span className="text-xl font-semibold">
                  Video courses
                  <span className="text-gray-500 ml-2">Nx custom courses</span>
                </span>
              </a>
            </div>
            <div id="other-links">
              <a
                id="nx-console"
                className="button-pill bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow p-4 block mb-4"
                href="https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console&utm_source=nx-project"
                target="_blank"
                rel="noreferrer"
              >
                <span className="text-xl">
                  Install Nx Console
                  <span className="text-gray-100 ml-2">Plugin for VSCode</span>
                </span>
              </a>
              <div
                id="nx-cloud"
                className="bg-white p-6 rounded-lg shadow mb-4"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    NxCloud
                    <span className="text-gray-500 ml-2">
                      Enable faster CI & better DX
                    </span>
                  </h2>
                </div>
                <p className="text-lg mb-4">
                  You can activate distributed tasks executions and caching by
                  running:
                </p>
                <pre className="bg-gray-200 text-gray-700 p-4 rounded mb-4">
                  nx connect-to-nx-cloud
                </pre>
                <a
                  href="https://nx.app/?utm_source=nx-project"
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg font-semibold underline"
                >
                  {' '}
                  What is Nx Cloud?{' '}
                </a>
              </div>
              <a
                id="nx-repo"
                className="button-pill bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow p-4 block"
                href="https://github.com/nrwl/nx?utm_source=nx-project"
                target="_blank"
                rel="noreferrer"
              >
                <span className="text-xl">
                  Nx is open source
                  <span className="text-gray-100 ml-2">
                    Love Nx? Give us a star!
                  </span>
                </span>
              </a>
            </div>
          </div>

          <div id="commands" className="bg-white p-6 rounded-lg shadow mt-6">
            <h2 className="text-2xl font-bold mb-4">Next steps</h2>
            <p className="text-lg mb-6">
              Here are some things you can do with Nx:
            </p>
            <details className="mb-4">
              <summary className="text-xl font-semibold mb-2">
                Add UI library
              </summary>
              <pre className="bg-gray-200 text-gray-700 p-4 rounded">
                <span># Generate UI lib</span>
                nx g @nx/next:library ui
                <span># Add a component</span>
                nx g @nx/next:component button --project=ui
              </pre>
            </details>
            <details className="mb-4">
              <summary className="text-xl font-semibold mb-2">
                View interactive project graph
              </summary>
              <pre className="bg-gray-200 text-gray-700 p-4 rounded">
                nx graph
              </pre>
            </details>
            <details className="mb-4">
              <summary className="text-xl font-semibold mb-2">
                Run affected commands
              </summary>
              <pre className="bg-gray-200 text-gray-700 p-4 rounded">
                <span># see what&apos;s been affected by changes</span>
                nx affected:graph
                <span># run tests for current changes</span>
                nx affected:test
                <span># run e2e tests for current changes</span>
                nx affected:e2e
              </pre>
            </details>
          </div>

          <p id="love" className="text-xl mt-6">
            Carefully crafted with
          </p>
        </div>
      </div>
    </div>
  );
}
