import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { getAccessToken } from '@/api/auth';
import { colors, radii, spacing, typography } from '@/constants/theme';
import { useHydrated } from '@/hooks/useHydrated';
import type { UserProfile } from '@/types/profile';

type ProfileHeaderProps = Pick<
  UserProfile,
  'displayName' | 'imageUrl' | 'level' | 'levelProgress' | 'login'
>;

export function ProfileHeader({
  displayName,
  imageUrl,
  level,
  levelProgress,
  login,
}: ProfileHeaderProps) {
  const { width } = useWindowDimensions();
  const [imageAuth, setImageAuth] = useState<{ url: string; token: string } | null>(null);
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const isHydrated = useHydrated();
  const isWide = isHydrated && width >= 700;
  const avatarSize = isHydrated ? Math.min(Math.max(width * 0.3, 104), 160) : 104;
  const progress = Math.min(Math.max(levelProgress, 0), 100);
  const canLoadRemoteImage =
    imageUrl && imageAuth?.url === imageUrl && failedImageUrl !== imageUrl;
  const imageSource = canLoadRemoteImage
    ? {
        uri: imageUrl,
        headers: { Authorization: `Bearer ${imageAuth.token}` },
      }
    : require('../../assets/images/icon.png');

  useEffect(() => {
    let isCancelled = false;

    if (!imageUrl) {
      return undefined;
    }

    getAccessToken()
      .then((token) => {
        if (!isCancelled) {
          setImageAuth({ url: imageUrl, token });
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setFailedImageUrl(imageUrl);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [imageUrl]);

  return (
    <View style={[styles.card, isWide && styles.cardWide]}>
      <Image
        accessibilityLabel={`${login}'s profile picture`}
        contentFit="cover"
        onError={() => {
          if (imageUrl) {
            setFailedImageUrl(imageUrl);
          }
        }}
        source={imageSource}
        style={[styles.avatar, { width: avatarSize, height: avatarSize }]}
        transition={180}
      />

      <View style={styles.identity}>
        <Text numberOfLines={2} style={styles.displayName}>
          {displayName || login}
        </Text>
        <Text numberOfLines={1} style={styles.login}>
          @{login}
        </Text>

        <View style={styles.levelBlock}>
          <View style={styles.levelLabels}>
            <Text style={styles.levelLabel}>Level {level.toFixed(2)}</Text>
            <Text style={styles.progressLabel}>{Math.round(progress)}%</Text>
          </View>
          <View
            accessibilityLabel={`Level progress ${Math.round(progress)} percent`}
            accessibilityRole="progressbar"
            style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    gap: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    padding: spacing.lg,
  },
  cardWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceMuted,
  },
  identity: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  displayName: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
    flexShrink: 1,
  },
  login: {
    color: colors.textMuted,
    fontSize: typography.body,
  },
  levelBlock: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  levelLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  levelLabel: {
    color: colors.text,
    fontWeight: '700',
  },
  progressLabel: {
    color: colors.textMuted,
    fontWeight: '600',
  },
  progressTrack: {
    height: 10,
    overflow: 'hidden',
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceMuted,
  },
  progressFill: {
    height: '100%',
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
  },
});
