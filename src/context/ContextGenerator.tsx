import { createContext, ReactNode, useContext } from "react";

/**
 * Generates a React Context along with its Provider and a custom hook for consuming the context.
 *
 * @template T The type of the context value.
 * @param contextName The name of the context, used for error messages.
 * @returns An object containing the `Provider` component and a `useContextValue` hook.
 */
export default function contextGenerator<T>(contextName: string) {
    /**
     * The React Context instance. Initially set to `undefined` to enforce usage within the Provider.
     */
    const Context = createContext<T | undefined>(undefined);

    /**
     * A Provider component that wraps children components and supplies the context value.
     *
     * @param value - The value to provide to the context.
     * @param children - The components that will consume the context value.
     */
    const Provider: React.FC<{ value: T; children: ReactNode }> = ({
        value,
        children,
    }) => {
        return <Context.Provider value={value}>{children}</Context.Provider>;
    };

    /**
     * Custom hook for consuming the context value.
     * Ensures that the hook is used within a corresponding Provider.
     *
     * @throws {Error} If used outside of a Provider, an error is thrown with a descriptive message.
     * @returns The current context value.
     */
    const useContextValue = (): T => {
        const context = useContext(Context);

        if (!context) {
            throw new Error(
                `use${contextName} must be used within a ${contextName}Provider`,
            );
        }

        return context;
    };

    return { Provider, useContextValue };
}
