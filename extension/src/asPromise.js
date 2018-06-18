export default function asPromise(f) {
  return new Promise((resolve, reject) => {
    f((...result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(...result);
      }
    });
  });
}
