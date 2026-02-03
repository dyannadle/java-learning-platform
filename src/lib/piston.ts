export interface ExecutionResult {
    run: {
        stdout: string;
        stderr: string;
        output: string;
        code: number;
        signal: string | null;
    };
    language: string;
    version: string;
}

const PISTON_API_URL = 'https://emkc.org/api/v2/piston/execute';

export const executeCode = async (language: string, version: string, code: string): Promise<ExecutionResult> => {
    try {
        const response = await fetch(PISTON_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                language: language,
                version: version,
                files: [
                    {
                        content: code,
                    },
                ],
            }),
        });

        if (!response.ok) {
            throw new Error(`Execution failed: ${response.statusText}`);
        }

        const data = await response.json();
        return data as ExecutionResult;
    } catch (error) {
        console.error('Piston API Error:', error);
        throw error;
    }
};

export const SUPPORTED_LANGUAGES = [
    { name: 'java', version: '15.0.2' },
];
