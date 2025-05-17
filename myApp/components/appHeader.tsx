import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.title : undefined,
        style,
      ]}
      {...rest}
    />
    <Image>
        <img style={{width: 323, height: 188, left: 0, top: 0, position: 'absolute', borderRadius: 20}} src="https://ik.imagekit.io/jnuywf1puw/fetchly_logo-removebg-preview.png?updatedAt=1747513714503" />
    </Image>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 36,
  },
});
