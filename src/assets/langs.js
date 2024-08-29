// Not used yet! This will be the home of all the languages and their code blocks soon

export const languages = {
  javascript: [
    `for (let i = 0; i < 10; i++) {\nconsole.log(i);\n};`,
    `const greet = (name) => {\nreturn \`Hello, \${name}!\`;\n};`,
    // other JS code blocks...
  ],
  python: [
    `for i in range(10):\n    print(i)`,
    `def greet(name):\n    return f"Hello, {name}!"`,
    // other Python code blocks...
  ],
  cpp: [
    `for (int i = 0; i < 10; i++) {\nstd::cout << i;\n};`,
    `void greet(string name) {\nstd::cout << "Hello, " << name << "!";\n};`,
    // other C++ code blocks...
  ],
  java: [
    `for (int i = 0; i < 10; i++) {\nSystem.out.println(i);\n};`,
    `public String greet(String name) {\nreturn "Hello, " + name + "!";\n};`,
    // other Java code blocks...
  ],
  php: [
    `for ($i = 0; $i < 10; $i++) {\necho $i;\n};`,
    `function greet($name) {\nreturn "Hello, $name!";\n};`,
    // other PHP code blocks...
  ],
};
