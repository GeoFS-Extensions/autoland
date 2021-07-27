export interface InitResult {
    filename: string;
}
export declare enum Frameworks {
    angularjs = "AngularJS",
    vuejs = "Vue.js",
    markdown = "Markdown"
}
export declare function init(cwd: string): Promise<InitResult>;
